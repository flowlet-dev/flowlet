# Troubleshooting

## 1. `make up` で起動失敗する

症状:

- `POSTGRES_USER` などの環境変数未設定エラー

確認:

```powershell
Get-Content -Encoding UTF8 infra/.env.prod
```

対処:

- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` を設定する。

## 2. Frontend から API 呼び出しで CORS エラー

症状:

- ブラウザコンソールで CORS ブロック

原因:

- Backend は `http://localhost:5173` のみ許可

対処:

- Frontend を `npm run dev`（既定ポート `5173`）で起動する。
- 別ポート利用時は `backend` の `WebConfig` を更新する。

## 3. DB接続失敗（Backend）

症状:

- 起動ログに datasource 接続エラー

確認:

```powershell
make ps
make logs
```

対処:

- `db` サービスが稼働しているか確認する。
- `POSTGRES_*` の値が `db` / `backend` で一致しているか確認する。

## 4. `UUID` 形式エラーで更新/削除失敗

症状:

- `PUT` / `DELETE` の `transaction_id` で `400` 系エラー

対処:

- 一覧APIの `transactionId` をそのまま利用する。

## 5. `npm run lint` が失敗する

確認:

```powershell
cd frontend/flowlet
npm run lint
```

対処:

- エラーメッセージの対象ファイルだけを最小修正する。
- 一括リファクタは分離する。
