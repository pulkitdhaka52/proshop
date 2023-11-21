// const express= require('express'); //normal node js syntax
import path from 'path';
import express from 'express'; // we are using this one as we are using the same in frontend and this is es6 modules one.
import dotenv from 'dotenv';
import ProductRoutes from "./routes/productRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import OrderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js';
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

app.use('/api/products',ProductRoutes);
app.use('/api/users',UserRoutes);
app.use('/api/orders',OrderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static(path.join(__dirname,'/frontend/build')));

  app.get('*',(req,resp)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  });
}else{
  app.get('/', (req, resp) => {
      resp.send("Api is running")
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on ${port}`));