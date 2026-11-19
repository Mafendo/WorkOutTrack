package com.workouttrack.Db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {
    public static Connection getConnection() throws SQLException {

        try {
            var jdbcUrl = DatabaseConfig.getDbUrl();
            var user = DatabaseConfig.getDbUser();
            var password = DatabaseConfig.getDbPass();
            return DriverManager.getConnection(jdbcUrl, user, password);
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return null;
        }
    }
}
