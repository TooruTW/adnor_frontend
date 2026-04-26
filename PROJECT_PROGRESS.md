# 專案進度紀錄（目前依程式碼盤點）

## 後台功能

### 已完成

- 登入功能（Supabase Auth）
- 上傳圖庫功能（可上傳圖片到 Supabase Storage）
- 新增章節功能（可選書本並建立章節資料）
- 新增頁面功能（上傳圖片後可新增 pages 資料）
- 章節列表與章節頁面讀取（可讀取 chapters 與 pages 並顯示）

### 部分完成（已有畫面與互動，尚未完整串接）

- 編輯章節功能（目前為前端暫存編輯，尚未看到更新資料庫 API）
- 刪除章節功能（目前為前端刪除清單狀態，尚未看到刪除資料庫 API）
- 刪除頁面功能（目前為前端刪除暫存狀態，尚未看到刪除資料庫 API）

### 未完成

- 編輯章節資料持久化（update 到資料庫）
- 刪除章節資料持久化（delete 到資料庫）
- 刪除頁面資料持久化（delete 到資料庫）

## API 功能

### 已開發

- `signInWithEmailPassword`（登入）
- `fetchBookOptions`（取得書本下拉選單）
- `createChapter`（新增章節）
- `fetchAllChapters`（取得全部章節）
- `fetchChapterPages`（取得單章節頁面）
- `testSupabaseConnection`（連線測試）

### 已串接（前端畫面已呼叫）

- 新增章節 Dialog 已串接 `fetchBookOptions`、`createChapter`
- 編輯頁列表已串接 `fetchAllChapters`
- 章節詳情卡已串接 `fetchChapterPages`
- 圖片上傳 Dialog 已串接 Supabase Storage 與 pages 新增流程

### 未開發 / 未串接

- 章節更新 API（update）
- 章節刪除 API（delete）
- 頁面刪除 API（delete）
- 章節編輯完成後自動 refresh 與錯誤處理整合

## SQL trigger

### 已開發

觸發 pages 頁數計算
計算chapter 最後更新（條件 chapter insert update）
觸發 chapter 頁數計算

## 前台

### 未開始

- 尚未開始開發
