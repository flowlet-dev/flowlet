# Environment Variables

## 概要

主に `infra/.env.prod` と `docker-compose.prod.yml` で使用する。

## 必須

| Name | Used by | Purpose |
|---|---|---|
| `POSTGRES_USER` | `db`, `backend` | DB接続ユーザー |
| `POSTGRES_PASSWORD` | `db`, `backend` | DB接続パスワード |
| `POSTGRES_DB` | `db`, `backend` | DB名 |

## 任意（デフォルトあり）

| Name | Default | Purpose |
|---|---|---|
| `DB_PORT` | `5450` | ホスト側DB公開ポート |
| `BACKEND_PORT` | `8081` | ホスト側Backend公開ポート |
| `VITE_API_BASE_URL` | `/api` | フロントエンドが呼び出す API のベース URL。静的ファイルと API を同一ホストから提供する本番構成では省略可能ですが、別ホストに API がある場合はここで先頭パス (例: `http://localhost:8081/api`) を指定して上書きします。|

## バックエンド設定との対応

- `application-prod.properties`:
- `spring.datasource.url=jdbc:postgresql://db:5432/${POSTGRES_DB}`
- `spring.datasource.username=${POSTGRES_USER}`
- `spring.datasource.password=${POSTGRES_PASSWORD}`

## 例（`infra/.env.prod`）

```dotenv
POSTGRES_USER=flowlet_user
POSTGRES_PASSWORD=change_me
POSTGRES_DB=flowlet
DB_PORT=5450
BACKEND_PORT=8081
```

注意: 実運用値はコミットしない。
