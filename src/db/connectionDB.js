import mongoose from 'mongoose';
const connectionDB =async()=>{
    try {
       const connection = await mongoose.connect(process.env.MONGO_URL)
       console.log("Database is connected",connection.connection.host);
        
    } catch (error) {
        console.log(error);
        
    }
}
export default connectionDB;