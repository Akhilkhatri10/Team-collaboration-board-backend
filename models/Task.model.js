import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    assignedTo: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Board'
        type: String, // Assuming assignedTo is a user ID in string format
        required: false 
    },
    dueDate: {
        type: Date
    }
}, { timestamps: true });
    
export const Task = mongoose.model("Task", taskSchema);