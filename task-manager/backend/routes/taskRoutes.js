const express = require("express");
const TaskController = require("../controllers/TaskController");

const router = express.Router();

router.get("/tasks", TaskController.getAll);
router.get("/tasks/:id", TaskController.getById);
router.post("/tasks", TaskController.create);
router.put("/tasks/:id", TaskController.update);
router.delete("/tasks/:id", TaskController.delete);

module.exports = router;
