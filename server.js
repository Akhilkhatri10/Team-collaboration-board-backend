import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import taskRoutes from './routes/task.route.js';
import boardRoutes from './routes/boards.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config({});


const app = express();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOptions = {
  origin: 'https://team-collaboration-board-frontend.onrender.com',
  credentials: true
}
app.use(cors(corsOptions))


const PORT = process.env.PORT || 3000;

//API's
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Server not started due to DB connection failure.");
});