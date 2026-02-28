# Data Model

## 対象

- DB: PostgreSQL
- スキーマ: `flowlet`
- マイグレーション: `backend/flowlet/src/main/resources/db/migration/V1__init.sql`

## テーブル: `flowlet.t_transaction`

| Column | Type | Nullable | Description |
|---|---|---|---|
| `transaction_id` | `uuid` | No | 取引ID (PK) |
| `transaction_date` | `date` | No | 取引日 |
| `amount` | `integer` | No | 金額(円) |
| `transaction_type` | `varchar(10)` | No | `INCOME` / `EXPENSE` |
| `memo` | `text` | Yes | メモ |
| `created_at` | `timestamp` | No | 作成日時 |
| `updated_at` | `timestamp` | No | 更新日時 |

## インデックス

- `idx_t_transaction_date` on `transaction_date`

## JPA対応

- Entity: `TTransaction`
- Repository: `TransactionJpaRepository`
- 主キー型: `UUID`

## 集計仕様

`TransactionJpaRepository#getSumByTransactionTypeAndPeriod` は以下条件で合計を返す。

- `transactionType = :type`
- `transactionDate >= :from`
- `transactionDate < :to`
- データ無し時は `0`（`COALESCE`）
