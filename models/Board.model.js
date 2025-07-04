import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
}, { timestamps: true }); // This automatically adds createdAt & updatedAt

export const Board = mongoose.model("Board", boardSchema);
