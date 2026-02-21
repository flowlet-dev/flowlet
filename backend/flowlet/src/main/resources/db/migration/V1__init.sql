-- スキーマ作成
create schema if not exists flowlet;

-- t_transaction 作成
create table flowlet.t_transaction
(
    transaction_id   uuid primary key,
    transaction_date date        not null,
    amount           integer     not null,
    transaction_type varchar(10) not null,
    memo             text,
    created_at       timestamp   not null,
    updated_at       timestamp   not null
);

comment on table flowlet.t_transaction is '収支';
comment on column flowlet.t_transaction.transaction_id is '取引ID';
comment on column flowlet.t_transaction.transaction_date is '取引日';
comment on column flowlet.t_transaction.amount is '金額(円)';
comment on column flowlet.t_transaction.transaction_type is '取引種別(INCOME / EXPENSE)';
comment on column flowlet.t_transaction.memo is 'メモ';
comment on column flowlet.t_transaction.created_at is '作成日時';
comment on column flowlet.t_transaction.updated_at is '更新日時';

-- インデックス作成
create index idx_t_transaction_date on flowlet.t_transaction (transaction_date);
