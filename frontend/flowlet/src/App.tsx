import "./App.css";
import {Anchor, AppShell, Container, Group} from "@mantine/core";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionPage";

export default function App() {
    return (
        <AppShell header={{height: 60}} padding={"md"}>

            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <strong>FLOWLET</strong>
                    <Group gap="md">
                        <Anchor component={Link} to={"/dashboard"}>ダッシュボード</Anchor>
                        <Anchor component={Link} to={"/transactions"}>取引</Anchor>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Container size={"md"}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                        <Route path="/dashboard" element={<DashboardPage/>}/>
                        <Route path="/transactions" element={<TransactionsPage/>}/>
                        <Route path="*" element={<div>404 Not Found</div>}/>
                    </Routes>
                </Container>
            </AppShell.Main>

        </AppShell>
    );
}

