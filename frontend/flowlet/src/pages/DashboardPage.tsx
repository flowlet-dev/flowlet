import {Alert, Card, Loader, Stack, Text, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import type {SummaryResponse} from "../types/transactions.ts";
import {getSummary} from "../api/transactions.ts";

const yen = new Intl.NumberFormat("ja-JP");

export default function DashboardPage() {
    const [summary, setSummary] = useState<SummaryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const run = async () => {
            try {
                setError(null);
                const data = await getSummary();
                setSummary(data);
            } catch {
                setError("サマリー取得に失敗しました。");
            } finally {
                setLoading(false);
            }
        };
        void run();
    }, []);

    if (loading) {
        return <Loader/>;
    }

    return (
        <Stack gap={"md"}>
            <Title order={2}>ダッシュボード</Title>

            {error && <Alert color="red">{error}</Alert>}

            {summary && (
                <Card withBorder radius={"md"} p={"lg"}>
                    <Text>今月収入: {yen.format(summary.current.income)} 円</Text>
                    <Text>今月支出: {yen.format(summary.current.expense)} 円</Text>
                    <Text>前月収入: {yen.format(summary.previous.income)} 円</Text>
                    <Text>前月支出: {yen.format(summary.previous.expense)} 円</Text>
                </Card>
            )}
        </Stack>
    );
};