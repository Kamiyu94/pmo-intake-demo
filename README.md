# Intake Studio — PMO Intake 公開展示

Kris Lu / Kamiyu Lab 的需求治理與 AI 工作流程作品。所有案例、人物、地址與數據都是為公開展示重新編寫的虛構資料。

- 展示網站：https://kamiyu94.github.io/pmo-intake-demo/
- 個人作品集：https://kamiyu94.github.io/prototypes/
- 配套作品：https://kamiyu94.github.io/project-portfolio-demo/

## 體驗路徑

1. 選擇需求，查看原始內容與預先編寫的分類建議。
2. 帶入草稿，由人員確認分類、小組、理由與審定狀態。
3. 保存示範審核，查看版本歷史與當時的來源快照。
4. 將目前定稿核准為示範判例；模擬來源補充後，舊建議停用、舊版退出有效判例。
5. 「Intake 技能流程」說明 Agent 技能與工作台的分工，並提供通用公開版 `skill/SKILL.md`。

## 展示界線

這是獨立重製的互動展示，不是正式環境的副本。沒有郵件、試算表、模型、派工或訊息服務的連線。AI 建議由展示資料預先編寫，不代表網站實際執行模型。技能檔也不會自動在網站執行。

審核與來源修改存在瀏覽器 localStorage，不跨裝置共享。訪客可用「重設展示」恢復初始資料。示範審核人不是登入或身分驗證。判例核准是本機流程示範，不是正式授權系統。

## 開發

原生 HTML/CSS/ES modules，無第三方執行時依賴、外部字型、分析追蹤或 API 金鑰。

```sh
npm test
npm run check
python3 -m http.server 4320 --bind 127.0.0.1
```

透過 HTTP 開啟 `index.html`。GitHub Pages 以 `main` 分支根目錄發布。`assets/data.mjs` 是唯一的初始資料來源；`assets/model.mjs` 管理版本、來源變動與判例條件。
