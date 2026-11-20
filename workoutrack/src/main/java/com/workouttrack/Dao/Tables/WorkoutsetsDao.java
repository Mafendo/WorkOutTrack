package com.workouttrack.Dao.Tables;

import com.workouttrack.Dao.Abstract.BaseDao;
import com.workouttrack.Dao.Exeption.DaoException;
import com.workouttrack.Db.DbConnection;
import com.workouttrack.Domain.WorkoutSet;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class WorkoutsetsDao extends BaseDao<WorkoutSet, Integer> {

    @Override
    protected String getTableName() {
        return "workout_sets";
    }

    @Override
    protected WorkoutSet mapRow(ResultSet rs) throws SQLException {
        return new WorkoutSet(
                rs.getInt("id"),
                rs.getInt("workout_id"),
                rs.getInt("exercise_id"),
                rs.getInt("set_number"),
                rs.getDouble("weight"),
                rs.getInt("reps")
        );
    }

    @Override
    protected String getInsertSql() {
        return """
                INSERT INTO workout_sets (workout_id, exercise_id, set_number, weight, reps)
                VALUES (?, ?, ?, ?, ?)
                RETURNING id, workout_id, exercise_id, set_number, weight, reps
                """;
    }

    @Override
    protected void bindInsertParameters(PreparedStatement stmt, WorkoutSet entity) throws SQLException {
        stmt.setInt(1, entity.workoutId());
        stmt.setInt(2, entity.exerciseId());
        stmt.setInt(3, entity.setNumber());
        stmt.setDouble(4, entity.weight());
        stmt.setInt(5, entity.reps());
    }

    @Override
    protected WorkoutSet mapInsertedRow(ResultSet rs, WorkoutSet entity) throws SQLException {
        return mapRow(rs);
    }

    @Override
    protected String getUpdateSql() {
        return """
                UPDATE workout_sets
                SET workout_id = ?, exercise_id = ?, set_number = ?, weight = ?, reps = ?
                WHERE id = ?
                RETURNING id, workout_id, exercise_id, set_number, weight, reps
                """;
    }

    @Override
    protected void bindUpdateParameters(PreparedStatement stmt, Integer id, WorkoutSet entity) throws SQLException {
        stmt.setInt(1, entity.workoutId());
        stmt.setInt(2, entity.exerciseId());
        stmt.setInt(3, entity.setNumber());
        stmt.setDouble(4, entity.weight());
        stmt.setInt(5, entity.reps());
        stmt.setInt(6, id);
    }

    @Override
    protected WorkoutSet mapUpdatedRow(ResultSet rs, Integer id, WorkoutSet entity) throws SQLException {
        return mapRow(rs);
    }

    // Batch i pågående transaktion
    public void insertAll(Connection conn, int workoutId, List<WorkoutSet> sets) throws SQLException {
        String sql = """
                INSERT INTO workout_sets (workout_id, exercise_id, set_number, weight, reps)
                VALUES (?, ?, ?, ?, ?)
                """;

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            int setNum = 1;
            for (WorkoutSet set : sets) {
                stmt.setInt(1, workoutId);
                stmt.setInt(2, set.exerciseId());
                stmt.setInt(3, set.setNumber() > 0 ? set.setNumber() : setNum);
                stmt.setDouble(4, set.weight());
                stmt.setInt(5, set.reps());
                stmt.addBatch();
                setNum++;
            }
            stmt.executeBatch();
        }
    }


    public List<WorkoutSet> findByWorkoutId(int workoutId) {
        String sql = """
                SELECT id, workout_id, exercise_id, set_number, weight, reps
                FROM workout_sets
                WHERE workout_id = ?
                ORDER BY set_number ASC, id ASC
                """;

        List<WorkoutSet> result = new ArrayList<>();

        try (Connection conn = DbConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, workoutId);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    result.add(mapRow(rs));
                }
            }
            return result;
        } catch (SQLException e) {
            throw new DaoException("Kunde inte hämta set för workoutId=" + workoutId, e);
        }
    }
}