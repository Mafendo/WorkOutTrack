package com.workouttrack.Domain;
public record WorkoutSet(
        int id,
        int workoutId,
        int exerciseId,
        int setNumber,
        double weight,
        int reps
) {}