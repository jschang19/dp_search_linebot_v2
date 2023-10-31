
# 大學科系查詢小幫手
![Banner](https://i.imgur.com/K6Dw0QB.jpeg)

讓高中學生能透過 LINE 快速找到全台校系的簡章與申請資料，包含個人申請、繁星推薦與分科測驗，目前有 2.6 萬位使用者（ 2023 / 11 / 1 更新 ）


## Features

- 根據查詢關鍵字，回覆相對應校系申請資料
- 儲存使用者的收藏科系、查詢模式偏好設定
- 一鍵將面試日期加入 Google 行事曆（ 個人申請 ）


## Demo
傳送校系名稱或簡稱，即可取得該校系的申請簡章、備審參採項目，歷年分數等資料：

![search](https://i.imgur.com/ZlDZNy5.jpeg)

收藏有興趣的校系，傳送「 收藏 」即可一次找出所有目標校系：

![save](https://i.imgur.com/bDVCCH0.jpeg)

掃描下方 QR code 即可加機器人好友:

![qrcode](https://i.imgur.com/e2I7UAR.jpeg)

[點我加入 LINE Bot 好友](https://lin.ee/KUh346e)


## Tech Stack

Language: TypeScript

Runtime Environment: Node.js (v18)

Serverless Computing Platform: [Google Cloud Functions (2nd Gen)](https://cloud.google.com/functions)

Database: [Supabase](https://supabase.com)
## Run Locally

將專案程式碼複製到你的本機端

```bash
  git clone https://github.com/jschang19/dp_search_linebot_v2/
  cd dp_search_linebot_v2
```

安裝需要的套件，並在本機端執行
```bash
  yarn install
  yarn start
```


## Running Tests
若要進行測試，執行：
```bash
  yarn test
```

Unit test 檔案位於 `src/test/` 中


## Deployment

若要部署本專案到 Google Cloud Function，請確定你已經[設定 gcloud SDK](https://cloud.google.com/sdk/docs/install) 並創建好自己的 GCP 專案跟 Supabase 專案。

修改 `/deploy.sh` 第一行後面，改成你的 function 名稱：

```bash
gcloud functions deploy {這裡改成你的 function 名稱} \
--gen2 \
--runtime=nodejs18 \
--region=asia-east1 \
--source=. \
--max-instances=2 \
--entry-point=handleRequest \
--trigger-http \
--allow-unauthenticated \
--no-user-output-enabled
```

完成後，執行以下指令即可部署到 Cloud Function：

```bash
  yarn deploy
```



## Environment Variables

若要執行此專案，你需要先在本機端建立 `.env`，並同時 Cloud Function 中先加入以下環境變數：

`LINE_CHANNEL_ACCESS_TOKEN`

`LINE_CHANNEL_SECRET`

`SUPABASE_URL`

`SUPABASE_SERVICE_KEY`

需要注意的是，Supabase 如果是放入 anon key （ 公開權限的 key ）會需要另外設定 PostgreSQL 的 Row Level Security。


## API Reference

#### LINE Messaging API callback

```http
  POST /line
```

在 LINE Developer Console 中，請將專案的 Webhook URL 設為 `{your_service_domain}/line` 才能以正確的 handler 處理 LINE Messaging API 的請求

p.s. 你可以視專案需求，新增其他 handler 與相對應的觸發 webhook，例如從 Supabase 發送 POST 到 `/push-message` 來主動推播給使用者


## FAQ

#### 我可以怎麼修改這個 Project?

本專案適合修改作為有下列 2 點業務需求的專案：

1. 以關鍵字查找靜態大量資料
2. 儲存特定資料與使用者偏好

本專案透過 Regex 頗析使用者的查詢目標，在相對應大學的 csv 中取得校系資料，你可以透過建立自己了資料 csv，或是存在 Supabase 中，再透過程式打包成 Flex Messgae 回傳給使用者。

#### 可以自定義 LINE Bot 的回覆內容嗎？
可以，你可以修改 `config/index.ts` 中的字串，來統一調整 LINE Bot 的回覆文字訊息。

#### 可以使用其他資料庫嗎？

可以，雖然本專案是用 Supabase，但你也可以改使用 mongodb 或其他你習慣的資料庫服務，並稍加修改原先處理 DB 操作的函式即可。

#### 什麼是 Cloud Function？

Cloud Function 是 Google Cloud 的 Serverless 執行環境，無須自行維護伺服器（ 會選擇它是因為可以~~無腦 auto scale~~成本相對較低 ）

有關於 Cloud Function 的費用、Node.js 服務的部署細節，建議參考這篇文：
[Heroku 取消免費方案？教你用 Cloud Functions 架設 LINEBOT！](https://taichunmin.idv.tw/blog/2022-09-11-gcp-functions-hosting.html)



#### 部署在 Cloud Function 時失敗怎麼辦？

請檢查是否有先設定 Cloud Function 的環境變數，或是到 Funtion 的記錄分頁中查看 console.log 訊息：

![GCP function log](https://i.imgur.com/OWRHRKC.png)

[點我看教學](https://cloud.google.com/functions/docs/configuring/env-var#setting_runtime_environment_variables)


## Appendix

#### 本專案的開發動機

「 大學科系查詢小幫手 」是個人 2021 年、高三寒假時所寫的 side project，主要是觀察到身邊同學對紙本簡章翻閱不變的抱怨，發想到用聊天機器人幫同學找科系資料。

高三時，我因為還不熟悉資料庫跟程式開發，所以粗暴地用了 App Script + Google Sheet 架起了第一個版本，後來經過兩次 refactor，而這個 repo 是第二次重構後的版本（ 第一版用 Pyhton 重構後反而更可怕 ）

不過本專案還是有部分高三留下的技術債，像是中文字的物件 key 以及沒跟程式專案分離 csv 資料，明年會逐步修正這些部分。


## Special Thanks

個人能開發出本專案，很大部份是以前受於 [@taichunmin](https://github.com/taichunmin) 前輩指教與分享，才能學會 Node.js LINE Bot 開發與 Cloud Function FaaS 的使用。

此外前輩開發的 LINE Bot 也幫助我在設計訊息介面時能更加快速：

[LINE Flex 開發人員工具](https://github.com/taichunmin/gcf-line-devbot)


## License

[MIT](https://choosealicense.com/licenses/mit/). Feel free to use for your project :)

