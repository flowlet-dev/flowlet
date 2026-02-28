# Architecture

## 概要

Flowlet は「React + Spring Boot + PostgreSQL」の3層構成。

- Frontend: `frontend/flowlet`
- Backend: `backend/flowlet`
- Infra: `infra`

## Backend レイヤー

パッケージ構成（`backend/flowlet/src/main/java/com/example/flowlet`）:

- `presentation`: HTTPエンドポイントとDTO変換
- `application/service`: ユースケース実装
- `infrastructure/persistence`: JPA Entity / Repository
- `config`: Web設定（CORS等）

責務例:

- `presentation/TransactionController.java`: API入出力
- `application/service/TransactionService.java`: 登録/更新/削除/集計ロジック
- `infrastructure/persistence/repository/TransactionJpaRepository.java`: DB集計クエリ

## Frontend 構成

`frontend/flowlet/src`:

- `App.tsx`: 画面全体、一覧/集計の取得、削除処理
- `TransactionForm.tsx`: 登録・更新フォーム
- `TransactionList.tsx`: 一覧表示と編集/削除イベント

## データフロー

1. フロントが `http://localhost:8080/api/transactions` を呼ぶ。
2. `TransactionController` が `TransactionService` に委譲する。
3. `TransactionService` が `TransactionJpaRepository` 経由で `t_transaction` を操作する。
4. DTOに変換してJSONを返却する。

## インフラ構成

`infra/docker-compose.prod.yml`:

- `db`: Postgres 18（`5432`）
- `backend`: Spring Boot（コンテナ内 `8080`）
- ホスト公開ポートは `DB_PORT` / `BACKEND_PORT` で上書き可能。
