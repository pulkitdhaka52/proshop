// const express= require('express'); //normal node js syntax
import express from 'express'; // we are using this one as we are using the same in frontend and this is es6 modules one.
import dotenv from 'dotenv';
import ProductRoutes from "./routes/productRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDb from './config/db.js';
const port = process.env.PORT || "5000";

connectDb();
const app = express();

//body parser 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/', (req, resp) => {
    resp.send("Api is running")
});

app.use('/api/products',ProductRoutes);
app.use('/api/users',UserRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on ${port}`));