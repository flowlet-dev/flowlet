# flowlet - Infra

flowlet のインフラ構成（Docker Compose）。

## ディレクトリ構成
```
infra/
├── docker-compose.prod.yml   # 本番用 Docker Compose 定義
├── .env.prod                 # 環境変数（Git管理外）
├── .gitignore
└── postgres-prod-data/       # PostgreSQL データボリューム（Git管理外）
```

## 技術スタック

| 項目 | 内容 |
|---|---|
| コンテナ管理 | Docker Compose |
| DB | PostgreSQL 18 |

## サービス構成

| サービス名 | 説明 | デフォルトポート |
|---|---|---|
| `db` | PostgreSQL データベース | `5450` |
| `backend` | Spring Boot アプリ（フロントエンド同梱） | `8081` |

## セットアップ

### 1. 環境変数の準備

`infra/.env.prod` を作成する。`.env.prod` は Git 管理外のため、以下を参考に手動作成すること。
```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db
BACKEND_PORT=8081   # 任意
DB_PORT=5450        # 任意
```

### 2. 起動

ルートの Makefile を使うか、直接 Docker Compose コマンドを実行する。
```bash
# Makefile（推奨）
make up

# または直接
cd infra
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
```

`backend` コンテナ起動時に Flyway マイグレーションが自動実行される。

### 3. 確認

| サービス | URL |
|---|---|
| アプリ（フロントエンド / API） | `http://<host>:8081` |
| DB | `localhost:5450` |

## その他のコマンド
```bash
make down     # 停止
make restart  # 再起動
make logs     # ログ確認
make ps       # コンテナ状態確認
```
