import {useEffect} from "react";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Card, Group, NumberInput, Select, Stack, TextInput, Title} from "@mantine/core";
import {notifications} from "@mantine/notifications";
import type {Transaction, TransactionPayload} from "./types/transactions.ts";
import {createTransaction, updateTransaction} from "./api/transactions.ts";

interface Props {
    onSuccess: () => void;
    editingTransaction: Transaction | null;
}

const transactionSchema = z.object({
    transactionDate: z.string().min(1, "日付は必須です"),
    amount: z.number().positive("金額は0より大きい値を入力してください"),
    transactionType: z.enum(["EXPENSE", "INCOME"]),
    memo: z.string().max(200, "メモは200文字以内で入力してください").optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

const defaultValues: TransactionFormValues = {
    transactionDate: "",
    amount: 0,
    transactionType: "EXPENSE",
    memo: "",
};


export default function TransactionForm({onSuccess, editingTransaction}: Props) {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues
    });

    useEffect(() => {
        if (editingTransaction) {
            reset({
                transactionDate: editingTransaction.transactionDate,
                amount: editingTransaction.amount,
                transactionType: editingTransaction.transactionType,
                memo: editingTransaction.memo ?? ""
            });
            return;
        }
        reset(defaultValues);
    }, [editingTransaction, reset]);

    const onSubmit = async (values: TransactionFormValues) => {
        const payload: TransactionPayload = {
            transactionDate: values.transactionDate,
            amount: values.amount,
            transactionType: values.transactionType,
            memo: values.memo ?? ""
        };

        try {
            if (editingTransaction) {
                await updateTransaction(editingTransaction.transactionId, payload);
            } else {
                await createTransaction(payload);
            }

            await onSuccess();
            notifications.show({
                color: "teal",
                message: editingTransaction ? "更新しました" : "登録しました"
            });
        } catch {
            notifications.show({color: "red", message: "保存に失敗しました"});
        }
    };


    return (
        <Card withBorder radius={"md"} p={"lg"}>
            <Stack gap={"md"}>
                <Title order={3}>{editingTransaction ? "取引を編集" : "取引を登録"}</Title>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap={"sm"}>
                        <TextInput
                            label={"日付"}
                            type={"date"}
                            {...register("transactionDate")}
                            error={errors.transactionDate?.message}
                        />

                        <Controller
                            name={"amount"}
                            control={control}
                            render={({field}) => (
                                <NumberInput
                                    label={"金額"}
                                    min={1}
                                    thousandSeparator={","}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.amount?.message}
                                />
                            )}
                        />

                        <Controller
                            name={"transactionType"}
                            control={control}
                            render={({field}) => (
                                <Select
                                    label={"区分"}
                                    data={[
                                        {value: "INCOME", label: "収入"},
                                        {value: "EXPENSE", label: "支出"},
                                    ]}
                                    value={field.value}
                                    onChange={(value) => field.onChange(value ?? "EXPENSE")}
                                    error={errors.transactionType?.message}
                                />
                            )}
                        />

                        <TextInput
                            label={"メモ"}
                            placeholder={"例: ランチ"}
                            {...register("memo")}
                            error={errors.memo?.message}
                        />

                        <Group justify={"flex-end"} mt={"xs"}>
                            <Button type={"submit"} loading={isSubmitting}>
                                {editingTransaction ? "更新する" : "登録する"}
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Stack>
        </Card>
    );
};