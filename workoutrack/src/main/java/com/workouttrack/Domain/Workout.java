package com.workouttrack.Domain;

import java.time.LocalDateTime;
import java.util.List;

public record Workout(
        int id,
        int typeId,
        String notes,
        LocalDateTime createdAt,
        List<WorkoutSet> sets) {
}