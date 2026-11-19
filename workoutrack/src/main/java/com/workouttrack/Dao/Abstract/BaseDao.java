package com.workouttrack.Dao.Abstract;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.workouttrack.Dao.Abstract.Exeption.DaoException;
import com.workouttrack.Db.DbConnection;

public abstract class BaseDao<T, ID> implements CRUD<T, ID> {

    protected abstract String getTableName();

    protected abstract T mapRow(ResultSet rs) throws SQLException;

    protected abstract String getInsertSql();

    protected abstract void bindInsertParameters(PreparedStatement stmt, T entity) throws SQLException;

    protected abstract T mapInsertedRow(ResultSet rs, T entity) throws SQLException;

    public T insert(T entity) {
        String sql = getInsertSql();
        try (Connection conn = DbConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            bindInsertParameters(stmt, entity);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapInsertedRow(rs, entity);
                }
                throw new DaoException("Ingen rad returnerades vid INSERT i " + getTableName());
            }
        } catch (SQLException e) {
            throw new DaoException("Kunde inte spara i " + getTableName(), e);
        }
    }

    protected abstract String getUpdateSql();

    protected abstract void bindUpdateParameters(PreparedStatement stmt, ID id, T entity) throws SQLException;

    protected abstract T mapUpdatedRow(ResultSet rs, ID id, T entity) throws SQLException;

    public T update(ID id, T entity) {
        if (id == null) {
            throw new IllegalArgumentException("ID får inte vara null vid UPDATE");
        }

        String sql = getUpdateSql();
        try (Connection conn = DbConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            bindUpdateParameters(stmt, id, entity);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapUpdatedRow(rs, id, entity);
                }
                throw new DaoException("Ingen rad hittades att uppdatera med id=" + id + " i " + getTableName());
            }
        } catch (SQLException e) {
            throw new DaoException("Kunde inte uppdatera i " + getTableName(), e);
        }
    }

    @Override
    public Optional<T> findById(ID id) {
        if (id == null) {
            return Optional.empty();
        }

        String sql = "SELECT * FROM " + getTableName() + " WHERE id = ?";
        try (Connection conn = DbConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setObject(1, id);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new DaoException("Kunde inte hämta post med id=" + id + " från " + getTableName(), e);
        }
    }

    @Override
    public List<T> findAll() {
        String sql = "SELECT * FROM " + getTableName();
        List<T> rows = new ArrayList<>();

        try (Connection conn = DbConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                rows.add(mapRow(rs));
            }
            return rows;
        } catch (SQLException e) {
            throw new DaoException("Kunde inte hämta poster från " + getTableName(), e);
        }
    }

    @Override
    public boolean deleteById(ID id) {
        if (id == null) {
            return false;
        }

        String sql = "DELETE FROM " + getTableName() + " WHERE  id = ?";
        try (Connection conn = DbConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setObject(1, id);
            int affectedRows = stmt.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            throw new DaoException("Kunde inte ta bort post med id=" + id + " från " + getTableName(), e);
        }
    }
}