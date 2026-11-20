package com.workouttrack.Controller;

import java.util.List;

import com.workouttrack.Dao.Tables.WorkoutsDao;
import com.workouttrack.Domain.Workout;
import com.workouttrack.Domain.WorkoutSet;
import com.workouttrack.Dto.CreateWorkoutDTO;

import io.javalin.http.Context;
import io.javalin.http.HttpStatus;
import io.javalin.http.NotFoundResponse;

public class WorkoutController {
    private final WorkoutsDao workoutsDao;

    public WorkoutController(WorkoutsDao workoutsDao) {
        this.workoutsDao = workoutsDao;
    }

    // GET /api/workouts
    public void getAll(Context ctx) {
        List<Workout> workouts = workoutsDao.findAll();
        ctx.status(HttpStatus.OK).json(workouts);
    }

    // GET /api/workouts/{id}
    public void getById(Context ctx) {
        int id = parseId(ctx.pathParam("id"));

        Workout workout = workoutsDao.findByIdWithSets(id)
                .orElseThrow(() -> new NotFoundResponse("Träningspass med id " + id + " hittades inte"));

        ctx.status(HttpStatus.OK).json(workout);
    }

    // POST /api/workouts
    public void create(Context ctx) {
        CreateWorkoutDTO request = ctx.bodyAsClass(CreateWorkoutDTO.class);

        if (request.typeId() <= 0) {
            throw new IllegalArgumentException("typeId måste vara större än 0");
        }
        if (request.sets() == null || request.sets().isEmpty()) {
            throw new IllegalArgumentException("Ett träningspass måste innehålla minst ett set");
        }

        List<WorkoutSet> sets = request.sets().stream()
                .map(s -> {
                    if (s.exerciseId() <= 0) {
                        throw new IllegalArgumentException("exerciseId måste vara större än 0");
                    }
                    if (s.reps() <= 0) {
                        throw new IllegalArgumentException("reps måste vara större än 0");
                    }
                    if (s.weightKg() < 0) {
                        throw new IllegalArgumentException("weight kan inte vara negativ");
                    }
                    return new WorkoutSet(0, 0, s.exerciseId(), s.setNumber(), s.weightKg(), s.reps());
                })
                .toList();

        Workout created = workoutsDao.createWithSets(request.typeId(), request.notes(), sets);
        ctx.status(HttpStatus.CREATED).json(created);
    }

    private int parseId(String rawId) {
        try {
            int id = Integer.parseInt(rawId);
            if (id <= 0) {
                throw new IllegalArgumentException("ID måste vara ett positivt heltal");
            }
            return id;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Ogiltigt ID: '" + rawId + "'");
        }
    }
}
