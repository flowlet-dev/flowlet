# Docs Maintenance

## 目的

`docs` 配下の文書を、実装と矛盾なく維持するための最小ルールを定義する。

## 更新の基本方針

- 1変更1目的で更新する。
- 実装を根拠に記述する（推測で仕様を断定しない）。
- 既存文書の見出しスタイルを維持する。

## 更新フロー

1. 変更対象文書を特定する。
2. 実装を確認する（コード/設定/コマンド）。
3. 最小差分で更新する。
4. 関連リンクと参照先を確認する。
5. 返答時に「結論 / 変更点 / 検証結果」を記載する。

## 実装照合の例

```powershell
rg -n "RequestMapping|GetMapping|PostMapping|PutMapping|DeleteMapping" backend/flowlet/src/main/java
rg -n "server\\.port|datasource|flyway" backend/flowlet/src/main/resources
Get-Content -Raw -Encoding utf8 infra/docker-compose.prod.yml
```

## 文書更新時チェックリスト

- API パス・HTTPメソッド・パラメータ名は実装と一致しているか。
- ポート番号・環境変数名・コマンドは現行設定と一致しているか。
- 既存リンク切れがないか（`docs/README.md` から辿れるか）。
- 検証不能な項目は理由と残リスクを明記したか。
