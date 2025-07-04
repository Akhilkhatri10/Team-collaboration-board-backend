import mongoose from "mongoose";
import { Task } from "../models/Task.model.js";


export const getTasksByBoardId = async (req, res) => {
  const { id: boardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(boardId)) {
    return res.status(400).json({ success: false, message: "Invalid board ID" });
  }

  try {
    const tasks = await Task.find({ boardId }).populate("assignedTo", "name");
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ success: false, message: "Error fetching tasks", error: error.message });
  }
};



export const createTask = async (req, res) => {
  const { title, description, status, priority, assignedTo, dueDate } = req.body;
  const { id: boardId } = req.params;

  if (!title || !description || !boardId) {
    return res.status(400).json({ success: false, message: "Title, description, and boardId are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(boardId)) {
    return res.status(400).json({ success: false, message: "Invalid board ID" });
  }

  try {
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      assignedTo: assignedTo || null,
      dueDate,
      boardId,
    });

    await newTask.save();
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    console.error("Error creating task:", error.message);
    res.status(500).json({ success: false, message: "Error creating task", error: error.message });
  }
};




export const updateTask = async (req, res) => {
  const { id } = req.params;
  let { title, description, status, priority, assignedTo, dueDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid task ID" });
  }

  // Build update object safely
  const updateData = {
    title,
    description,
    status,
    priority,
    dueDate,
  };

  if (assignedTo && mongoose.Types.ObjectId.isValid(assignedTo)) {
    updateData.assignedTo = assignedTo;
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ success: false, message: "Error updating task", error: error.message });
  }
};




export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid task ID" });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error.message);
    res.status(500).json({ success: false, message: "Error deleting task", error: error.message });
  }
};
