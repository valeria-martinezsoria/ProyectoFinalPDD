const Task = require("../models/Task");

const TaskController = {
  getAll: (req, res) => {
    Task.getAll((err, tasks) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(tasks);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;
    Task.getById(id, (err, task) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
      res.json(task);
    });
  },

  create: (req, res) => {
    const { title, description, status } = req.body;
    Task.create({ title, description, status }, (err, newTask) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(newTask);
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    Task.update(id, { title, description, status }, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Tarea actualizada correctamente" });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    Task.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Tarea eliminada correctamente" });
    });
  },
};

module.exports = TaskController;
