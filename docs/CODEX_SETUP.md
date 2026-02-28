# Codex Setup Guide

## 目的

このプロジェクトで Codex と安全に高速開発するための、最小運用ルールを定義する。

## 推奨運用フロー

1. 課題を1つに絞る（例: API不具合修正のみ）。
2. 影響範囲を確認する（`rg` で関連ファイルを特定）。
3. 最小差分で修正する。
4. 近接粒度で検証する（frontend なら `npm run lint`、backend なら `.\gradlew.bat test`）。
5. 結果を「結論 / 変更点 / 検証結果」の順で共有する。

## 依頼テンプレート

以下テンプレートを使うと、意図と完了条件の認識ズレを減らせる。

```md
目的:
対象:
制約:
完了条件:
検証方法:
```

## よく使う依頼例

- 「`frontend/flowlet/src/App.tsx` の表示崩れを修正。`npm run lint` が通ること。」
- 「`TransactionController` のバリデーションエラー時レスポンスを統一。`.\gradlew.bat test` で確認。」
- 「本番 compose に healthcheck 追加。既存の起動手順を壊さないこと。」

## NGパターン

- 目的が複数ある依頼（機能追加 + 全体リファクタ + デザイン変更を同時に依頼）。
- 完了条件がない依頼（「いい感じに直して」）。
- 検証条件がない依頼（正しさの判断ができない）。

## 初回セットアップ確認チェックリスト

- `AGENTS.md` がリポジトリ直下に存在する。
- `frontend/flowlet/package.json` の scripts が利用可能。
- `backend/flowlet/gradlew.bat` でテスト実行可能。
- `make up` で `infra/docker-compose.prod.yml` が起動可能。
