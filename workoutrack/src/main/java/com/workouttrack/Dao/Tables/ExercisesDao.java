package com.workouttrack.Dao.Tables;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.workouttrack.Domain.Exercise;
import com.workouttrack.Dao.Abstract.BaseDao;

public class ExercisesDao extends BaseDao<Exercise, Integer> {

    @Override
    protected String getTableName() {
        return "exercises";
    }

    @Override
    protected Exercise mapRow(ResultSet rs) throws SQLException {
        return new Exercise(
                rs.getInt("id"),
                rs.getString("name"));
    }

    @Override
    protected String getInsertSql() {
        return "INSERT INTO exercises (name) VALUES (?) RETURNING id, name";
    }

    @Override
    protected void bindInsertParameters(PreparedStatement stmt, Exercise entity) throws SQLException {
        stmt.setString(1, entity.name());
    }

    @Override
    protected Exercise mapInsertedRow(ResultSet rs, Exercise entity) throws SQLException {
        return new Exercise(
                rs.getInt("id"),
                rs.getString("name"));
    }

    @Override
    protected String getUpdateSql() {
        return "UPDATE exercises SET name = ? WHERE id = ? RETURNING id, name";
    }

    @Override
    protected void bindUpdateParameters(PreparedStatement stmt, Integer id, Exercise entity) throws SQLException {
        stmt.setString(1, entity.name());
        stmt.setInt(2, id);
    }

    @Override
    protected Exercise mapUpdatedRow(ResultSet rs, Integer id, Exercise entity) throws SQLException {
        return new Exercise(
                rs.getInt("id"),
                rs.getString("name"));
    }
}
