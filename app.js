import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} `);
})