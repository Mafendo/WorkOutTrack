package com.workouttrack.Dto;

import java.util.List;

//DTO som tar emot hela passet från webbsidan i ett enda JSON-anrop
public record CreateWorkoutDTO(
        int typeId,
        String notes,
        List<SetItemDTO> sets) 
        {
}
