document.addEventListener('DOMContentLoaded', function() {
    fetchWords();
});

document.getElementById('add-word-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const word = document.getElementById('word').value;
    const partOfSpeech = document.getElementById('partOfSpeech').value;
    const englishTranslation = document.getElementById('englishTranslation').value;
    const chineseTranslation = document.getElementById('chineseTranslation').value;
    const exampleSentence = document.getElementById('exampleSentence').value;

    fetch('/add-word', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word, partOfSpeech, englishTranslation, chineseTranslation, exampleSentence })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data === "Word added successfully") {
                fetchWords();
                document.getElementById('add-word-form').reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function fetchWords() {
    fetch('/get-words')
        .then(response => response.json())
        .then(data => {
            const wordList = document.getElementById('word-list');
            wordList.innerHTML = '<h2>已添加的單字</h2>';
            data.forEach(word => {
                const wordItem = document.createElement('div');
                wordItem.classList.add('word-item');
                wordItem.innerHTML = `
          <h3>${word.word}</h3>
          <p><strong>詞性:</strong> ${word.partOfSpeech}</p>
          <p><strong>英文翻譯:</strong> ${word.englishTranslation}</p>
          <p><strong>中文翻譯:</strong> ${word.chineseTranslation}</p>
          <p><strong>例句:</strong> ${word.exampleSentence}</p>
        `;
                wordList.appendChild(wordItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function searchWord() {
    const word = document.getElementById('search-word').value;

    fetch(`/get-word/${word}`)
        .then(response => response.json())
        .then(data => {
            const modalWordDetails = document.getElementById('modal-word-details');
            if (data) {
                modalWordDetails.innerHTML = `
          <h2>${data.word}</h2>
          <p><strong>詞性:</strong> ${data.partOfSpeech}</p>
          <p><strong>英文翻譯:</strong> ${data.englishTranslation}</p>
          <p><strong>中文翻譯:</strong> ${data.chineseTranslation}</p>
          <p><strong>例句:</strong> ${data.exampleSentence}</p>
        `;
            } else {
                modalWordDetails.innerHTML = '<p>单词未找到</p>';
            }
            openModal();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function openModal() {
    document.getElementById('word-modal').style.display = "block";
}

function closeModal() {
    document.getElementById('word-modal').style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('word-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
