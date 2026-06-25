import express from 'express';
import env from 'dotenv';
env.config();
const PORT=process.env.PORT;
import { DbConnection } from './config/db.js';
import routes from './routes/index.route.js';

const app=express();
app.use(express.json());
app.use('/api/v0',routes);
DbConnection();

app.listen(PORT,()=>{
    console.log(`Server is Listening at http://localhost:${PORT}`);
})