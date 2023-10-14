import express from 'express';
import { getAllTask, addTask, updateTask, deleteTask, getTask } from '../controllers/task.js';
const router = express.Router();

router
.get('/', getAllTask)
.post("/", addTask)
.put("/:id", updateTask)
.delete("/:id", deleteTask)
.get('/:id', getTask)

export default router;