# Vocabulary Management Web App

## 概述
本專案是一個基於 HTML、CSS 和 JavaScript 的詞彙管理網頁應用，允許使用者 **查詢、添加、管理單字**，並存儲相關詞性、翻譯及例句。

## 功能
- **單字查詢**：輸入單字即可查看其詞性、翻譯與例句。
- **添加單字**：可添加詞性、英文翻譯、中文翻譯與例句。
- **單字庫管理**：顯示所有存儲的單字。
- **彈出視窗**：以模態視窗顯示查詢結果。

## 安裝與使用
確保安裝node.js，可透過以下指令確認。
```
node -v
npm -v
```
## 初始化一個express專案
```
npm init -y
npm install express
```

### 2. 啟動伺服器
```sh
npm install
npm start
```
伺服器將運行在 `http://localhost:4000`

### 3. 直接開啟 `index.html`
如果不使用伺服器，也可以直接打開 `index.html` 在瀏覽器中使用。

## 目錄結構
```
trackExpenses/
├── public/
│   ├── stylesheets/       # CSS 樣式文件
│   ├── javascripts/       # JavaScript 檔案
│   ├── index.html         # 主頁面
├── routes/                # Express.js 路由
├── views/                 # Pug 模板
├── app.js                 # 伺服器應用程式
└── package.json           # 專案描述檔案
```
