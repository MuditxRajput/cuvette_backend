import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectionDB from './db/connectionDB.js';
import jobRoutes from './Routes/jobPostingRoutes.js';
const app = express();
app.use(express.json())
app.use(cors())
app.use('/api',jobRoutes)
await connectionDB()
.then(()=>(app.listen(process.env.PORT || 8000,()=>{console.log(`sever is running at ${process.env.PORT}`);
})))
.catch((e)=>console.log(e)
)

