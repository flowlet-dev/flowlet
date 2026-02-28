import type {Transaction} from "./types/transactions.ts";
import {ActionIcon, Badge, Card, Group, Stack, Table, Text, Title} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";


interface Props {
    transactions: Transaction[];
    onEdit: (transaction: Transaction) => void;
    onDelete: (transactionId: string) => void;
}

const yen = new Intl.NumberFormat("ja-JP");

export default function TransactionList({transactions, onEdit, onDelete}: Props) {
    return (
        <Card withBorder radius={"md"} p={"lg"}>
            <Stack gap={"md"}>
                <Title order={3}>取引一覧</Title>

                {transactions.length === 0 ? (
                    <Text c="dimmed">取引がまだありません。</Text>
                ) : (
                    <Table striped highlightOnHover withTableBorder>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>日付</Table.Th>
                                <Table.Th>金額</Table.Th>
                                <Table.Th>区分</Table.Th>
                                <Table.Th>メモ</Table.Th>
                                <Table.Th>操作</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {transactions.map((tx) => (
                                <Table.Tr key={tx.transactionId}>
                                    <Table.Td>{tx.transactionDate}</Table.Td>
                                    <Table.Td>{yen.format(tx.amount)}</Table.Td>
                                    <Table.Td>
                                        <Badge color={tx.transactionType === "INCOME" ? "teal" : "red"}
                                               variant={"light"}>
                                            {tx.transactionType === "INCOME" ? "収入" : "支出"}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>{tx.memo || "-"}</Table.Td>
                                    <Table.Td>
                                        <Group gap={"xs"}>
                                            <ActionIcon
                                                variant={"light"}
                                                color={"blue"}
                                                aria-label={"編集"}
                                                onClick={() => onEdit(tx)}
                                            >
                                                <IconEdit size={16}/>
                                            </ActionIcon>

                                            <ActionIcon
                                                variant={"light"}
                                                color={"red"}
                                                aria-label={"削除"}
                                                onClick={() => onDelete(tx.transactionId)}
                                            >
                                                <IconTrash size={16}/>
                                            </ActionIcon>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                )}
            </Stack>
        </Card>
    );
}