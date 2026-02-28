# Runbook

## 目的

ローカル/運用相当環境での基本オペレーションを統一する。

## 前提

- Docker / Docker Compose が利用可能。
- `infra/.env.prod` が存在する。

## compose 起動（運用相当）

```powershell
make up
```

## 停止

```powershell
make down
```

## 状態確認

```powershell
make ps
```

## ログ追跡

```powershell
make logs
```

補足:

- Backend 公開ポートは既定で `8081`（`BACKEND_PORT` で変更可）
- DB 公開ポートは既定で `5450`（`DB_PORT` で変更可）

## 開発モード（Frontend）

```powershell
cd frontend/flowlet
npm run dev
npm run lint
npm run build
```

## 開発モード（Backend）

```powershell
cd backend/flowlet
.\gradlew.bat bootRun
.\gradlew.bat test
```

補足: `bootRun` 時の API ポートは `8080`。

## API疎通確認

```powershell
# bootRun の場合
curl http://localhost:8080/api/transactions
curl http://localhost:8080/api/transactions/summary

# compose の場合（既定）
curl http://localhost:8081/api/transactions
curl http://localhost:8081/api/transactions/summary
```

## 復旧の基本手順

1. `make ps` で落ちているサービスを特定する。
2. `make logs` で失敗理由を確認する。
3. `.env.prod` の必須変数を再確認する。
4. 必要なら `make down` -> `make up` で再起動する。

## 最低限の確認コマンド

```powershell
make ps
curl http://localhost:8081/api/transactions
```
