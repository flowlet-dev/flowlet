package com.example.flowlet.presentation;

import com.example.flowlet.application.service.TransactionService;
import com.example.flowlet.infrastructure.persistence.entity.TTransaction;
import com.example.flowlet.presentation.dto.PeriodSummaryResponse;
import com.example.flowlet.presentation.dto.TransactionRequest;
import com.example.flowlet.presentation.dto.TransactionResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    /**
     * 収支登録API
     *
     * @param request 収支登録リクエスト
     */
    @PostMapping
    public void register(@RequestBody @Valid TransactionRequest request) {

        transactionService.register(
                request.getTransactionDate(),
                request.getAmount(),
                request.getTransactionType(),
                request.getMemo()
        );

    }


    /**
     * 収支一覧取得API
     *
     * @return 収支一覧
     */
    @GetMapping
    public List<TransactionResponse> findAll() {

        List<TTransaction> tTransactions = transactionService.findAll();

        return tTransactions.stream()
                .map(t -> new TransactionResponse(
                        t.getTransactionId(),
                        t.getTransactionDate().toString(),
                        t.getAmount(),
                        t.getTransactionType(),
                        t.getMemo()
                ))
                .toList();

    }

    @PutMapping("/{transaction_id}")
    public void update(@PathVariable("transaction_id") String transactionId, @RequestBody @Valid TransactionRequest request) {

        transactionService.update(
                transactionId,
                request.getTransactionDate(),
                request.getAmount(),
                request.getTransactionType(),
                request.getMemo()
        );

    }

    /**
     * 収支削除API
     *
     * @param transactionId 収支ID
     */
    @DeleteMapping("/{transaction_id}")
    public void delete(@PathVariable("transaction_id") String transactionId) {
        transactionService.delete(transactionId);
    }

    /**
     * 今期/前期集計API
     *
     * @return 集計一覧
     */
    @GetMapping("/summary")
    public PeriodSummaryResponse getCurrentAndPreviousPeriodSummaries() {
        return transactionService.getCurrentAndPreviousPeriodSummaries();
    }

}
