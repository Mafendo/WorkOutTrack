package com.workouttrack.Dao.Tables;

import com.workouttrack.Dao.Exeption.DaoException;
import com.workouttrack.Db.DbConnection;
import com.workouttrack.Domain.Exercise;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TypeExercisesDao {

    public void add(int typeId, int exerciseId) {
        String sql = """
                INSERT INTO type_exercises (type_id, exercise_id)
                VALUES (?, ?)
                ON CONFLICT DO NOTHING
                """;

        try (Connection conn = DbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, typeId);
            stmt.setInt(2, exerciseId);
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new DaoException("Kunde inte lägga till koppling (" + typeId + ", " + exerciseId + ")", e);
        }
    }

    public boolean remove(int typeId, int exerciseId) {
        String sql = """
                DELETE FROM type_exercises
                WHERE type_id = ? AND exercise_id = ?
                """;

        try (Connection conn = DbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, typeId);
            stmt.setInt(2, exerciseId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DaoException("Kunde inte ta bort koppling (" + typeId + ", " + exerciseId + ")", e);
        }
    }

    public List<Exercise> findExercisesByTypeId(int typeId) {
        String sql = """
                SELECT e.id, e.name
                FROM exercises e
                JOIN type_exercises te ON te.exercise_id = e.id
                WHERE te.type_id = ?
                ORDER BY e.id
                """;

        List<Exercise> result = new ArrayList<>();

        try (Connection conn = DbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, typeId);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    result.add(new Exercise(
                            rs.getInt("id"),
                            rs.getString("name")
                    ));
                }
            }
            return result;
        } catch (SQLException e) {
            throw new DaoException("Kunde inte hämta övningar för typeId=" + typeId, e);
        }
    }
}