package com.example.flowlet.infrastructure.persistence.repository;


import com.example.flowlet.infrastructure.persistence.entity.TTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.UUID;

public interface TransactionJpaRepository extends JpaRepository<TTransaction, UUID> {

    @Query("""
            SELECT
                COALESCE(SUM(t.amount),0)
            FROM
                TTransaction t
            WHERE
                t.transactionType = :type
            AND
                t.transactionDate >= :from
            AND
                t.transactionDate < :to
            """)
    long getSumByTransactionTypeAndPeriod(
            @Param("type") String transactionType,
            @Param("from") LocalDate from,
            @Param("to") LocalDate to
    );

}
