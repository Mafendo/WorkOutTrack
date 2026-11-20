package com.workouttrack.Dao.Tables;

import com.workouttrack.Dao.Abstract.BaseDao;
import com.workouttrack.Dao.Exeption.DaoException;
import com.workouttrack.Db.DbConnection;
import com.workouttrack.Domain.Workout;
import com.workouttrack.Domain.WorkoutSet;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public class WorkoutsDao extends BaseDao<Workout, Integer> {

    private final WorkoutsetsDao workoutsetsDao;

    public WorkoutsDao(WorkoutsetsDao workoutsetsDao) {
        this.workoutsetsDao = workoutsetsDao;
    }

    @Override
    protected String getTableName() {
        return "workouts";
    }

    @Override
    protected Workout mapRow(ResultSet rs) throws SQLException {
        int id = rs.getInt("id");
        int typeId = rs.getInt("type_id");
        String notes = rs.getString("notes");
        Timestamp ts = rs.getTimestamp("created_at");
        LocalDateTime createdAt = ts != null ? ts.toLocalDateTime() : null;
        List<WorkoutSet> sets = workoutsetsDao.findByWorkoutId(id);

        return new Workout(id, typeId, notes, createdAt, sets);
    }

    @Override
    protected String getInsertSql() {
        return """
                INSERT INTO workouts (type_id, notes)
                VALUES (?, ?)
                RETURNING id, type_id, notes, created_at
                """;
    }

    @Override
    protected void bindInsertParameters(PreparedStatement stmt, Workout entity) throws SQLException {
        stmt.setInt(1, entity.typeId());
        stmt.setString(2, entity.notes());
    }

    @Override
    protected Workout mapInsertedRow(ResultSet rs, Workout entity) throws SQLException {
        int id = rs.getInt("id");
        int typeId = rs.getInt("type_id");
        String notes = rs.getString("notes");
        Timestamp ts = rs.getTimestamp("created_at");
        LocalDateTime createdAt = ts != null ? ts.toLocalDateTime() : null;
        List<WorkoutSet> sets = entity.sets() != null ? entity.sets() : List.of();

        return new Workout(id, typeId, notes, createdAt, sets);
    }

    @Override
    protected String getUpdateSql() {
        return """
                UPDATE workouts
                SET type_id = ?, notes = ?
                WHERE id = ?
                RETURNING id, type_id, notes, created_at
                """;
    }

    @Override
    protected void bindUpdateParameters(PreparedStatement stmt, Integer id, Workout entity) throws SQLException {
        stmt.setInt(1, entity.typeId());
        stmt.setString(2, entity.notes());
        stmt.setInt(3, id);
    }

    @Override
    protected Workout mapUpdatedRow(ResultSet rs, Integer id, Workout entity) throws SQLException {
        return mapRow(rs);
    }

    // skapa pass + alla set atomiskt
    public Workout createWithSets(int typeId, String notes, List<WorkoutSet> sets) {
        String insertWorkoutSql = """
                INSERT INTO workouts (type_id, notes)
                VALUES (?, ?)
                RETURNING id, type_id, notes, created_at
                """;

        try (Connection conn = DbConnection.getConnection()) {
            conn.setAutoCommit(false);

            try {
                int workoutId;
                int savedTypeId;
                String savedNotes;
                LocalDateTime createdAt;

                try (PreparedStatement stmt = conn.prepareStatement(insertWorkoutSql)) {
                    stmt.setInt(1, typeId);
                    stmt.setString(2, notes);

                    try (ResultSet rs = stmt.executeQuery()) {
                        if (!rs.next()) {
                            throw new DaoException("Ingen rad returnerades vid skapande av workout");
                        }
                        workoutId = rs.getInt("id");
                        savedTypeId = rs.getInt("type_id");
                        savedNotes = rs.getString("notes");
                        Timestamp ts = rs.getTimestamp("created_at");
                        createdAt = ts != null ? ts.toLocalDateTime() : LocalDateTime.now();
                    }
                }

                if (sets != null && !sets.isEmpty()) {
                    workoutsetsDao.insertAll(conn, workoutId, sets);
                }

                conn.commit();

                List<WorkoutSet> savedSets = workoutsetsDao.findByWorkoutId(workoutId);
                return new Workout(workoutId, savedTypeId, savedNotes, createdAt, savedSets);

            } catch (SQLException | RuntimeException e) {
                try {
                    conn.rollback();
                } catch (SQLException rollbackEx) {
                    e.addSuppressed(rollbackEx);
                }
                if (e instanceof DaoException daoEx) {
                    throw daoEx;
                }
                throw new DaoException("Transaktion misslyckades vid skapande av pass med set", e);
            } finally {
                conn.setAutoCommit(true);
            }
        } catch (SQLException e) {
            throw new DaoException("Databasfel vid transaktion för träningspass", e);
        }
    }

    public Optional<Workout> findByIdWithSets(int workoutId) {
        return findById(workoutId);
    }
}