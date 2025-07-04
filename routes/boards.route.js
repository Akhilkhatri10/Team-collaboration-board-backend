import express from 'express';
import { getAllBoards, createBoard } from '../controllers/board.controller.js';


const router = express.Router();

// Route to get all boards
router.get('/GET/boards', getAllBoards);

// Route to create a new board
router.post('/POST/boards', createBoard);

// Export the router
export default router;