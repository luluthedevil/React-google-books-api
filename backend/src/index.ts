import dotenv from 'dotenv';
import express from "express";
import { useRoutes } from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

const PORT = process.env.Port || 8090;

const app = express();


const corsOptions = {
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(bodyParser.json());
// eslint-disable-next-line react-hooks/rules-of-hooks
useRoutes(app);

app.listen(PORT, () => console.log('Server initiated on port ' + 8090));