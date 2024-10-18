import mongoose from 'mongoose';
const connectionDB =async()=>{
    try {
       const connection = await mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000,})
       console.log("Database is connected",connection.connection.host);
        
    } catch (error) {
        console.log(error);
        
    }
}
export default connectionDB;