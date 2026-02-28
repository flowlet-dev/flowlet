import {Alert, Card, Loader, Stack, Text, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import TransactionForm from "../TransactionForm.tsx";
import TransactionList from "../TransactionList.tsx";
import {notifications} from "@mantine/notifications";
import type {SummaryResponse} from "../types/transactions.ts";
import {deleteTransaction, getSummary, getTransactions} from "../api/transactions.ts";

export interface Transaction {
    transactionId: string;
    transactionDate: string;
    amount: number;
    transactionType: "EXPENSE" | "INCOME";
    memo: string;
}

export default function TransactionPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [summary, setSummary] = useState<SummaryResponse | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = async () => {
        setError(null);

        try {
            const [txs, sum] = await Promise.all([getTransactions(), getSummary()]);
            setTransactions(txs);
            setSummary(sum);
        } catch {
            setError("データ取得に失敗しました");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (transactionId: string) => {
        try {
            await deleteTransaction(transactionId);
            await refresh();
            notifications.show({color: "teal", message: "削除しました"});
        } catch {
            notifications.show({color: "red", message: "削除に失敗しました"});
        }
    };

    useEffect(() => {
        void refresh();
    }, []);

    if (loading){
        return <Loader />;
    }

    return (
        <Stack gap={"md"}>
            <Title order={2}>取引</Title>

            {error && <Alert color="red">{error}</Alert>}

            {summary && (
                <Card withBorder radius={"md"} p={"lg"}>
                    <Text>今月収入: {summary.current.income}</Text>
                    <Text>今月支出: {summary.current.expense}</Text>
                </Card>
            )}

            <TransactionForm
                editingTransaction={editingTransaction}
                onSuccess={async () => {
                    setEditingTransaction(null);
                    await refresh();
                }}
            />

            <TransactionList
                transactions={transactions}
                onEdit={setEditingTransaction}
                onDelete={handleDelete}
            />
        </Stack>
    );
}
