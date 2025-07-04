import express from 'express';
import {getTasksByBoardId, createTask, updateTask, deleteTask } from '../controllers/task.controller.js';


const router = express.Router();

// Route to get tasks by board ID
router.get('/GET/boards/:id/tasks', getTasksByBoardId);

// Route to create a new task in a specific board
router.post('/POST/boards/:id/tasks', createTask);

// Route to update a task by ID
router.put('/PUT/tasks/:id', updateTask);

// Route to delete a task by ID
router.delete('/DELETE/tasks/:id', deleteTask);

// Export the router
export default router;