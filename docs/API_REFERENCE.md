# API Reference

## ベースURL

- Backend を単体起動（`.\gradlew.bat bootRun`）: `http://localhost:8080`
- `make up`（compose）: `http://localhost:8081`（既定）

以降はパス部分を記載する。

## 共通仕様

- Content-Type: `application/json`
- `transactionType`: `INCOME` または `EXPENSE`（enum）

### リクエスト例

```json
{
  "transactionDate": "2026-02-25",
  "amount": 1200,
  "transactionType": "EXPENSE",
  "memo": "lunch"
}
```

### バリデーション

- `transactionDate`: 必須（ISO形式の日付文字列）
- `amount`: `1` 以上
- `transactionType`: 必須（`INCOME` / `EXPENSE`）
- `memo`: 最大255文字

## 1. 収支登録

- Method: `POST`
- Path: `/api/transactions`
- Response: `200 OK`（Bodyなし）

## 2. 収支一覧取得

- Method: `GET`
- Path: `/api/transactions`
- Response:

```json
[
  {
    "transactionId": "uuid",
    "transactionDate": "2026-02-25",
    "amount": 1200,
    "transactionType": "EXPENSE",
    "memo": "lunch"
  }
]
```

補足: 日付降順で返却される。

## 3. 収支更新

- Method: `PUT`
- Path: `/api/transactions/{transaction_id}`
- Request Body: 登録APIと同じ
- Response: `200 OK`（Bodyなし）

## 4. 収支削除

- Method: `DELETE`
- Path: `/api/transactions/{transaction_id}`
- Response: `200 OK`（Bodyなし）

## 5. 今期/前期集計

- Method: `GET`
- Path: `/api/transactions/summary`
- Response:

```json
{
  "current": {
    "income": 300000,
    "expense": 120000,
    "startDate": "2026-01-26",
    "endDate": "2026-02-24"
  },
  "previous": {
    "income": 280000,
    "expense": 100000,
    "startDate": "2025-12-25",
    "endDate": "2026-01-25"
  }
}
```

## CORS

- 許可Origin: `http://localhost:5173`
- 許可Method: `GET, POST, PUT, DELETE, OPTIONS`

## エラーレスポンス

共通形式:

```json
{
  "timestamp": "2026-02-26T00:00:00+09:00",
  "status": 400,
  "error": "Bad Request",
  "message": "amount: must be greater than or equal to 1",
  "path": "/api/transactions"
}
```

主なステータス:

- `400 Bad Request`: バリデーション違反、不正な日付/UUID、enum変換失敗（`transactionType` 不正値）
- `404 Not Found`: 更新/削除対象の取引が存在しない
- `500 Internal Server Error`: 想定外エラー

## 疎通確認例

```powershell
curl -X GET http://localhost:8080/api/transactions
curl -X GET http://localhost:8080/api/transactions/summary
```
