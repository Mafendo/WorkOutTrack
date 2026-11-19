package com.workouttrack.Dto;
// DTO som skickas tillbaka till webbsidan för historik/grafer (med riktiga namn, inte bara ID:n)
public record WorkoutHistoryDTO(
        int workoutId,
        String typeName,
        String exerciseName,
        int setNumber,
        double weightKg,
        int reps,
        String loggedAt) {
}
