import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import linkRoutes from './routes/linkRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
    }
));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
