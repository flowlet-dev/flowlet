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
