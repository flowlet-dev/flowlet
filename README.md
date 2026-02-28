# flowlet

収支を記録・管理するWebアプリケーションです。

## ディレクトリ構成

```
.
├── backend/flowlet/   # バックエンド（Spring Boot）
├── docs/              # ドキュメント
├── frontend/flowlet/  # フロントエンド（React）
└── infra/             # インフラ構成（Docker Compose）
```

詳細は各ディレクトリの `README.md` を参照してください。

## 技術スタック

| 領域 | 技術 |
|------|------|
| フロントエンド | React / TypeScript |
| バックエンド | Spring Boot / Java |
| データベース | PostgreSQL |
| マイグレーション | Flyway |
| インフラ | Docker Compose |

## コマンド

```bash
make up       # 起動
make down     # 停止
make restart  # 再起動
make logs     # ログ確認
make ps       # コンテナ状態確認
```

## Codex連携

- エージェントルール: `AGENTS.md`
- ドキュメント一覧: `docs/README.md`
- セットアップ手順: `docs/CODEX_SETUP.md`
