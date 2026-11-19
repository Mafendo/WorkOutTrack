package com.workouttrack.Db;

import io.github.cdimascio.dotenv.Dotenv;

public class DatabaseConfig {
    private static final Dotenv dotenv = Dotenv.configure()
            .directory("./workoutrack")
            .ignoreIfMissing()
            .load();

    public static String getDbUrl() {
        String envUrl = System.getenv("DATABASE_URL");
        return (envUrl != null && !envUrl.isEmpty()) ? envUrl : dotenv.get("DATABASE_URL");
    }

    public static String getDbUser() {
        String envDbUser = System.getenv("DB_USER");
        return (envDbUser != null && !envDbUser.isEmpty()) ? envDbUser : dotenv.get("DB_USER");
    }

    public static String getDbPass() {
        String envDbPass = System.getenv("DB_PASSWORD");
        return (envDbPass != null && !envDbPass.isEmpty()) ? envDbPass : dotenv.get("DB_PASSWORD");
    }
}