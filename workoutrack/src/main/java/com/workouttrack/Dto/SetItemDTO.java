package com.workouttrack.Dto;

public record SetItemDTO(
        int exerciseId,
        int setNumber,
        double weightKg,
        int reps) {
}
