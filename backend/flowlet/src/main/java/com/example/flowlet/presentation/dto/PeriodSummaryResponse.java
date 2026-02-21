package com.example.flowlet.presentation.dto;

public record PeriodSummaryResponse(
        PeriodSummary current,
        PeriodSummary previous
) {
}
