package com.workouttrack;

import java.sql.SQLException;

import com.workouttrack.Db.DbConnection;

import io.javalin.Javalin;

public class Main {

    public static void main(String[] args) {
        var app = Javalin.create(config -> {
            config.routes.get("/", ctx -> ctx.result("Hello World"));
        }).start(7070);

        try (var connection = DbConnection.getConnection()) {
            System.out.println("Connected to the PostgreSQL database.");
        } catch (SQLException e) {
            System.err.println(e.getMessage());
            
        }
    }
}