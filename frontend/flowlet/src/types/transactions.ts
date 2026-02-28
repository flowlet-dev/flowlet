export type TransactionType = "EXPENSE" | "INCOME";

export type Transaction = {
    transactionId: string;
    transactionDate: string;
    amount: number;
    transactionType: TransactionType;
    memo: string;
};

export type TransactionPayload = {
    transactionDate: string;
    amount: number;
    transactionType: TransactionType;
    memo: string;
};

export type PeriodSummary = {
    income: number;
    expense: number;
    startDate: string;
    endDate: string;
};

export type SummaryResponse = {
    current: PeriodSummary;
    previous: PeriodSummary;
};