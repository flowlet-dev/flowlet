# flowlet - Backend

収支管理アプリ flowlet のバックエンド。

## 技術スタック

| 項目 | 内容 |
|---|---|
| 言語 | Java 25 |
| フレームワーク | Spring Boot 4.0.2 |
| ビルドツール | Gradle 9.3.1 |
| DB | PostgreSQL 18 |
| マイグレーション | Flyway |

## アーキテクチャ

レイヤードアーキテクチャを採用。

```
flowlet/
├── src/main/java/com/example/flowlet/
│   ├── presentation/       # Controller・DTO（HTTPリクエスト/レスポンスの入出力）
│   ├── application/
│   │   └── service/        # ビジネスロジック
│   ├── infrastructure/
│   │   └── persistence/    # Entity・JPA Repository（DB アクセス）
│   └── config/             # CORS 等の設定クラス
├── src/main/resources/
│   ├── db/migration/       # Flyway マイグレーション SQL
│   ├── application.properties
│   ├── application-dev.properties
│   └── application-prod.properties
└── build.gradle
```

## 本番デプロイ手順

### 1. 環境変数の準備

`infra/.env.prod` を作成し、以下を設定する。

```env
POSTGRES_USER=xxxxxx
POSTGRES_PASSWORD=xxxxxx
POSTGRES_DB=xxxxxx
```

### 2. Docker Compose で起動

```bash
cd infra
docker compose -f docker-compose.prod.yml up -d --build
```

`backend` コンテナ起動時に Flyway マイグレーションが自動実行される。

### 3. 確認

| サービス | URL |
|---|---|
| Backend API | `http://<host>:8081` |
| DB | `localhost:5450` |

> ポートは `.env.prod` の `BACKEND_PORT` / `DB_PORT` で変更可能。
