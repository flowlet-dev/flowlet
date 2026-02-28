import {api} from "../client.ts";
import type {SummaryResponse, Transaction, TransactionPayload} from "../types/transactions.ts";

export async function getTransactions() {
    const {data} = await api.get<Transaction[]>("/transactions");
    return data;
}

export async function getSummary() {
    const {data} = await api.get<SummaryResponse>("/transactions/summary");
    return data;
}

export async function createTransaction(payload: TransactionPayload) {
    await api.post("/transactions", payload);
}

export async function updateTransaction(transactionId: string, payload: TransactionPayload) {
    await api.put(`/transactions/${transactionId}`, payload);
}

export async function deleteTransaction(transactionId: string) {
    await api.delete(`/transactions/${transactionId}`);
}
