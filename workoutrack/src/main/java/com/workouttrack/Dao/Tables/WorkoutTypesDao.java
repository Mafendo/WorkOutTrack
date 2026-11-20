package com.workouttrack.Dao.Tables;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.workouttrack.Dao.Abstract.BaseDao;
import com.workouttrack.Domain.WorkoutType;

public class WorkoutTypesDao extends BaseDao<WorkoutType, Integer>  {
@Override
    protected String getTableName() {
        return "workout_types";
    }
    @Override
    protected WorkoutType mapRow(ResultSet rs) throws SQLException {
        return new WorkoutType(
                rs.getInt("id"),
                rs.getString("name")
        );
    }
    @Override
    protected String getInsertSql() {
        return "INSERT INTO workout_types (name) VALUES (?) RETURNING id, name";
    }
    @Override
    protected void bindInsertParameters(PreparedStatement stmt, WorkoutType entity) throws SQLException {
        stmt.setString(1, entity.name());
    }
    @Override
    protected WorkoutType mapInsertedRow(ResultSet rs, WorkoutType entity) throws SQLException {
        return new WorkoutType(
                rs.getInt("id"),
                rs.getString("name")
        );
    }
    @Override
    protected String getUpdateSql() {
        return "UPDATE workout_types SET name = ? WHERE id = ? RETURNING id, name";
    }
    @Override
    protected void bindUpdateParameters(PreparedStatement stmt, Integer id, WorkoutType entity) throws SQLException {
        stmt.setString(1, entity.name());
        stmt.setInt(2, id);
    }

    @Override
    protected WorkoutType mapUpdatedRow(ResultSet rs, Integer id, WorkoutType entity) throws SQLException {
        return new WorkoutType(
                rs.getInt("id"),
                rs.getString("name")
        );
    }
}
