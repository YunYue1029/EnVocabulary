var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sqlite3 = require('sqlite3').verbose();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Initialize SQLite database
var db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE vocabulary (word TEXT PRIMARY KEY, partOfSpeech TEXT NOT NULL, englishTranslation TEXT, chineseTranslation TEXT NOT NULL, exampleSentence TEXT)");
});

// Add word API
app.post('/add-word', (req, res) => {
  const { word, partOfSpeech, englishTranslation, chineseTranslation, exampleSentence } = req.body;
  const stmt = db.prepare("INSERT INTO vocabulary VALUES (?, ?, ?, ?, ?)");
  stmt.run(word, partOfSpeech, englishTranslation, chineseTranslation, exampleSentence, (err) => {
    if (err) {
      return res.status(400).send("Error adding word");
    }
    res.send("Word added successfully");
  });
  stmt.finalize();
});

// Get all words API
app.get('/get-words', (req, res) => {
  db.all("SELECT * FROM vocabulary", [], (err, rows) => {
    if (err) {
      return res.status(400).send("Error fetching words");
    }
    res.json(rows);
  });
});

// Get word API
app.get('/get-word/:word', (req, res) => {
  const word = req.params.word;
  db.get("SELECT * FROM vocabulary WHERE word = ?", [word], (err, row) => {
    if (err) {
      return res.status(400).send("Error fetching word");
    }
    res.json(row);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Set the port and start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
