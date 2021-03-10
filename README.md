# Restaurant List

打造個人的餐廳清單~
一網打盡好吃美食!

## Features - 產品功能

<登入 & 註冊頁面>

1. 註冊 -> 使用者可以設定信箱和密碼
2. 登入 -> 使用者設定好信箱和密碼後，可以登入
3. 點擊 Facebook login -> 使用者可以用 Facebook 帳號登入
   <登入後頁面>
4. 點擊 Create Restaurant! 按鈕 -> 使用者可以創造屬於自己的帳號中，一筆新的餐廳資料
5. 首頁 -> 使用者可瀏覽所有餐廳清單
6. 搜尋框 -> 使用者可透過關鍵字搜尋相關的餐廳名稱
7. 點擊 排列順序 下拉選單 -> 使用者可以選擇使用不同的排列順序瀏覽餐廳清單
8. 點擊 detail 按鈕 -> 使用者可瀏覽單一餐廳清單的詳細資料
9. 點擊 edit 按鈕 -> 使用者可編輯單一餐廳清單的詳細資料
10. 點擊 delete 按鈕 -> 使用者可刪除單一餐廳清單
11. 點擊 back 按鈕 -> 使用者可回到首頁

### 登入頁

![](/pictures/login.png)

### 註冊頁

![](/pictures/register.png)

### 首頁

![](/pictures/index.png)

### create,edit 頁面

![](/pictures/edit.png)

### detail 頁面

![](/pictures/detail.png)

## Installing - 專案安裝流程

1. 開啟終端機，執行以下指令 :

   > `git clone https://github.com/KarolChang/restaurant-list-plus.git`

2. 進入專案資料夾

   > `cd restaurant-list-plus`

3. 安裝 npm 套件

   > `npm install "套件名稱" `

4. 安裝 nodemon

   > `npm install -g nodemon`

5. 使用腳本啟動專案

   (1) 新增種子資料

   > `npm run seed`

   (2) 啟動伺服器

   > `npm run dev`

   > 在瀏覽器進入 http://localhost:3000

## Environment & Tools - 環境&使用工具

- [Visual Studio Code 編輯器](https://code.visualstudio.com/)
- [Node.js (v10.15.0)](https://nodejs.org/en/)
- [express 框架](https://www.npmjs.com/package/express)
- [express handlebars 模板引擎](https://www.npmjs.com/package/express-handlebars)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [method-override](https://www.npmjs.com/package/method-override)
- [mongoDB](https://www.mongodb.com/2)
- [mongoose](https://mongoosejs.com/)
- [express-session](https://www.npmjs.com/package/express-session)
- [passport](https://www.npmjs.com/package/passport)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [passport-facebook](https://www.npmjs.com/package/passport-facebook)
- [connect-flash](https://www.npmjs.com/package/connect-flash)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
