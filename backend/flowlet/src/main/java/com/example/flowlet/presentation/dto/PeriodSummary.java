package com.example.flowlet.presentation.dto;

public record PeriodSummary(
        Long income,
        Long expense,

        String startDate,
        String endDate
) {
}
