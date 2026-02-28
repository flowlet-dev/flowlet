# AGENTS.md (flowlet)

## 適用範囲

- このファイルの指示は `C:\Users\jacks\Documents\flowlet` 配下に適用する。
- グローバル指示と矛盾する場合は、より制約が強い方を優先する。

## プロジェクト構成

- `backend/flowlet`: Spring Boot API (Java/Gradle)
- `frontend/flowlet`: React + TypeScript + Vite
- `infra`: Docker Compose 本番構成
- `docs`: プロジェクト文書

## 基本方針

- まず最短で動く修正を優先する。
- 1タスク1目的を守る。
- 変更は対象レイヤー内に閉じる。
- 既存の命名・責務分割・設計境界を尊重する。

## 実行コマンド

- ルート:
  - `make up` / `make down` / `make logs` / `make ps`
- Frontend (`frontend/flowlet`):
  - `npm run dev`
  - `npm run lint`
  - `npm run build`
- Backend (`backend/flowlet`):
  - `.\gradlew.bat bootRun`
  - `.\gradlew.bat test`

## 検証方針

- 変更箇所に最も近い粒度で検証する。
- Frontend 変更:
  - 必須: `npm run lint`
  - 推奨: `npm run build`
- Backend 変更:
  - 必須: `.\gradlew.bat test`
- テスト不能な場合は、理由・代替確認・残リスクを明記する。

## 安全方針

- 破壊的コマンドは明示指示がない限り実行しない。
- シークレットは出力・コミットしない。
- 無関係な差分は巻き戻さない。

## Skills運用

- 正本テンプレート: `docs/SKILLS_POLICY_TEMPLATE.md`
- 更新時はテンプレートを先に更新し、レイヤー固有文言以外を同期する。
- 運用中に繰り返し発生する指示や改善要望があれば、必要に応じてルールまたはskillを更新する（グローバル更新が困難な場合はプロジェクト側へ反映する）。
- skillは「明示指定された場合」または「タスク内容がskill説明に明確に一致する場合」にのみ使う。
- 複数候補がある場合は、目的達成に必要な最小セットだけを使う。
- skill適用時は、使うskill名と適用理由を1行で先に共有する。
- skill適用時も当該方針を優先する（1タスク1目的・最短実装・対象レイヤー外へ広げない）。
- skill実行時も既存の安全方針を厳守する（権限昇格は目的を1文で添えて承認を求める）。
- skill実行後は当該ファイルの検証方針に従って確認する。
- 検証不可の場合は、理由・代替確認・残リスクを明記する。

## 出力形式

- 返答は次の順で簡潔にまとめる:
  1. 結論
  2. 変更点
  3. 検証結果
  4. 次のアクション（必要時のみ）
