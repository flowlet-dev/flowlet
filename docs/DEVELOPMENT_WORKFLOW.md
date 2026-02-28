# Development Workflow

## 目的

Flowlet の日常開発を最短で安全に回すための、標準作業手順を定義する。

## 事前確認

- ルートの `AGENTS.md` を確認する。
- 変更対象レイヤーを1つに絞る。
- 無関係な差分を混ぜない。

## 標準フロー

1. 変更対象を特定する。

```powershell
rg -n "キーワード" backend/flowlet/src frontend/flowlet/src
```

2. 最小差分で実装する。
3. 近接粒度で検証する。

```powershell
# frontend変更時
cd frontend/flowlet
npm run lint
npm run build

# backend変更時
cd backend/flowlet
.\gradlew.bat test
```

4. 結果を共有する（結論 / 変更点 / 検証結果）。

## レイヤー別の基本方針

- Frontend: 表示/フォーム/通信の責務を分離し、型を維持する。
- Backend: `presentation -> application -> infrastructure` の責務境界を崩さない。
- Infra: `docker-compose.prod.yml` のサービス整合性を優先する。

## 変更時チェックリスト

- 目的は1つか。
- 変更は対象ディレクトリ内に閉じているか。
- 必須検証を実施したか。
- 実施できない検証と残リスクを明記したか。
