import mongoose from "mongoose";
import { Board } from "../models/Board.model.js";



export const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.status(200).json({ success: true, data: boards });
  } catch (error) {
    console.error("Error fetching boards:", error.message);
    res.status(500).json({ success: false, message: "Error fetching boards", error: error.message });
  }
};



export const createBoard = async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ success: false, message: "Board name is required" });
  }

  try {
    const newBoard = new Board({ name });
    await newBoard.save();
    res.status(201).json({ success: true, data: newBoard });
  } catch (error) {
    console.error("Error creating board:", error.message);
    res.status(500).json({ success: false, message: "Error creating board", error: error.message });
  }
};
