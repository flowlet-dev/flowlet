# AI Context

この文書は、Flowlet で作業するAIエージェントが最初に把握すべき事実をまとめたもの。

## Project Facts

- Monorepo構成:
- `backend/flowlet`: Spring Boot API
- `frontend/flowlet`: React + TypeScript + Vite
- `infra`: Docker Compose 本番相当構成

- 主要コマンド:
- ルート: `make up`, `make down`, `make logs`, `make ps`
- Frontend: `npm run dev`, `npm run lint`, `npm run build`
- Backend: `.\gradlew.bat bootRun`, `.\gradlew.bat test`

## API Facts

- Backend 開発ポート: `8080`
- CORS許可Origin: `http://localhost:5173`
- APIルート: `/api/transactions`
- 集計API: `/api/transactions/summary`

## Data Facts

- DB: PostgreSQL
- スキーマ: `flowlet`
- テーブル: `flowlet.t_transaction`
- マイグレーション: `V1__init.sql`

## Code Navigation Hints

- API入口: `backend/flowlet/src/main/java/com/example/flowlet/presentation/TransactionController.java`
- ユースケース: `backend/flowlet/src/main/java/com/example/flowlet/application/service/TransactionService.java`
- 永続化: `backend/flowlet/src/main/java/com/example/flowlet/infrastructure/persistence`
- Frontend画面: `frontend/flowlet/src/App.tsx`

## Guardrails

- 1タスク1目的を守る。
- 既存の無関係差分を巻き戻さない。
- 検証方針:
- Frontend変更時は最低 `npm run lint`
- Backend変更時は最低 `.\gradlew.bat test`
- テスト不能時は理由/代替確認/残リスクを明記する。

## Unknowns

- `infra/.env.prod` の実値はリポジトリ管理対象外（想定）。
- Backendの詳細ユニットテストは未整備（`contextLoads` のみ）。
