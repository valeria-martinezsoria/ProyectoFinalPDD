const db = require("../config/db");

class Task {
  static getAll(callback) {
    db.query("SELECT * FROM tasks", (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  }

  static getById(id, callback) {
    db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  }

  static create({ title, description, status }, callback) {
    db.query(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
      [title, description, status],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, { id: result.insertId, title, description, status });
      }
    );
  }

  static update(id, { title, description, status }, callback) {
    db.query(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status, id],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  }

  static delete(id, callback) {
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  }
}

module.exports = Task;
