import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL);
        console.log(`Mongo DB connected:${conn.connection.host}`);
    }catch(err){
        console.log(`Error: ${err.message}`);
        process.exit(1);//no idea of this line
    }
}
export default connectDb;

