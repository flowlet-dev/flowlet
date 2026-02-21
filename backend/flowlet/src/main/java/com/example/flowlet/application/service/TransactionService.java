package com.example.flowlet.application.service;

import com.example.flowlet.infrastructure.persistence.entity.TTransaction;
import com.example.flowlet.infrastructure.persistence.repository.TransactionJpaRepository;
import com.example.flowlet.presentation.dto.PeriodSummary;
import com.example.flowlet.presentation.dto.PeriodSummaryResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class TransactionService {

    private final TransactionJpaRepository transactionJpaRepository;

    public TransactionService(TransactionJpaRepository transactionJpaRepository) {
        this.transactionJpaRepository = transactionJpaRepository;
    }

    /**
     * 収支登録
     *
     * @param transactionDate 取引日
     * @param amount          金額
     * @param transactionType 取引種別
     * @param memo            メモ
     */
    public void register(String transactionDate, int amount, String transactionType, String memo) {

        if (amount <= 0) {
            throw new IllegalArgumentException("amount must be positive");
        }

        TTransaction tTransaction = new TTransaction(
                UUID.randomUUID(),
                LocalDate.parse(transactionDate),
                amount,
                transactionType,
                memo
        );

        transactionJpaRepository.save(tTransaction);

    }

    /**
     * 収支一覧取得
     *
     * @return 収支一覧
     */
    @Transactional(readOnly = true)
    public List<TTransaction> findAll() {
        return transactionJpaRepository.findAll()
                .stream()
                .sorted((a, b) -> b.getTransactionDate().compareTo(a.getTransactionDate()))
                .toList();
    }

    /**
     * 現在の期間と前月の収支を取得する
     *
     * @return 現在の期間と前月の収支
     */
    @Transactional(readOnly = true)
    public PeriodSummaryResponse getCurrentAndPreviousPeriodSummaries() {

        LocalDate today = LocalDate.now();

        LocalDate previousSalaryDate = calculateSalaryDate(today.minusMonths(1));
        LocalDate currentSalaryDate = calculateSalaryDate(today);
        LocalDate nextSalaryDate = calculateSalaryDate(today.plusMonths(1));

        PeriodSummary previous = getPeriodSummary(previousSalaryDate, currentSalaryDate);
        PeriodSummary current = getPeriodSummary(currentSalaryDate, nextSalaryDate);

        return new PeriodSummaryResponse(current, previous);
    }

    /**
     * 収支情報を更新する
     *
     * @param transactionId   収支ID
     * @param transactionDate 収支日
     * @param amount          金額
     * @param transactionType 収支種別
     * @param memo            メモ
     */
    public void update(String transactionId, String transactionDate, int amount, String transactionType, String memo) {

        TTransaction tTransaction = transactionJpaRepository.findById(UUID.fromString(transactionId))
                .orElseThrow(() -> new RuntimeException("Not Found"));

        tTransaction.setTransactionDate(LocalDate.parse(transactionDate));
        tTransaction.setAmount(amount);
        tTransaction.setTransactionType(transactionType);
        tTransaction.setMemo(memo);

    }

    /**
     * 指定された取引IDの収支を削除する
     *
     * @param transactionId 収支ID
     */
    public void delete(String transactionId) {
        transactionJpaRepository.deleteById(UUID.fromString(transactionId));
    }

    /**
     * 指定された期間の収支を取得する
     *
     * @param from 開始日
     * @param to   終了日
     * @return 指定された期間の収支
     */
    public PeriodSummary getPeriodSummary(LocalDate from, LocalDate to) {

        long income = transactionJpaRepository.getSumByTransactionTypeAndPeriod("INCOME", from, to);
        long expenses = transactionJpaRepository.getSumByTransactionTypeAndPeriod("EXPENSE", from, to);

        return new PeriodSummary(income, expenses, from.toString(), to.minusDays(1).toString());

    }

    /**
     * 指定された日付の月の給与日を計算する
     *
     * @param date 日付
     * @return 給与日
     */
    private LocalDate calculateSalaryDate(LocalDate date) {

        int salaryDate = 25;

        LocalDate candidateDate = date.withDayOfMonth(salaryDate);

        if (candidateDate.isAfter(date)) {
            candidateDate = candidateDate.minusMonths(1);
        }

        if (candidateDate.getDayOfWeek() == DayOfWeek.SATURDAY) {
            candidateDate = candidateDate.minusDays(1);
        } else if (candidateDate.getDayOfWeek() == DayOfWeek.SUNDAY) {
            candidateDate = candidateDate.minusDays(2);
        }

        return candidateDate;

    }

}
