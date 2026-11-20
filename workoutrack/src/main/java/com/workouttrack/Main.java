package com.workouttrack;

import java.util.Map;

import com.workouttrack.Controller.WorkoutController;
import com.workouttrack.Dao.Tables.WorkoutsDao;
import com.workouttrack.Dao.Tables.WorkoutsetsDao;

import io.javalin.Javalin;

public class Main {

    public static void main(String[] args) {
        WorkoutController workoutController = new WorkoutController(new WorkoutsDao(new WorkoutsetsDao()));

        Javalin app = Javalin.create(config -> {
            // Eventuell JSON/CORS konfiguration här
            config.routes.exception(Exception.class, (e, ctx) -> {
                ctx.status(500).json(Map.of(
                        "error", "Internal Server Error",
                        "message", "Ett oväntat serverfel inträffade"));

            });

            config.routes.get("/api/workouts", ctx -> workoutController.getAll(ctx));
            config.routes.get("/api/workouts/{id}", ctx -> workoutController.getById(ctx));
            config.routes.post("/api/workouts", ctx -> workoutController.create(ctx));
        });

        app.start(7070);

    }
}