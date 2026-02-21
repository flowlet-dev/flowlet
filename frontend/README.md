# flowlet - Frontend

収支管理アプリ flowlet のフロントエンド。

## 技術スタック

| 項目 | 内容 |
|---|---|
| 言語 | TypeScript 5.9 |
| フレームワーク | React 19 |
| ビルドツール | Vite 7 |
| Linter | ESLint 9 + typescript-eslint |

## ディレクトリ構成
```
frontend/flowlet/
├── src/
│   ├── main.tsx          # エントリーポイント
│   ├── App.tsx           # ルートコンポーネント・API呼び出し
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   └── index.css / App.css
├── index.html
├── vite.config.ts
└── package.json
```

## ローカル開発

### 前提条件

- Node.js（package.json の engines に準ずる）
- バックエンドが `http://localhost:8080` で起動済みであること

### セットアップ
```bash
cd frontend/flowlet
npm install
npm run dev
```

開発サーバーが `http://localhost:5173` で起動します。
`/api` へのリクエストはバックエンド（`:8080`）へプロキシされます。

## 主なコマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド（`dist/` に出力） |
| `npm run lint` | ESLint 実行 |
| `npm run preview` | ビルド結果のプレビュー |

## バックエンドとの連携

- API エンドポイント: `http://localhost:8080/api/transactions`
- 本番ビルド時は Spring Boot の static リソースとして配置される（`Dockerfile.prod` 参照）
