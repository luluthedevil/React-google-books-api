import dotenv from 'dotenv';
import express from "express";
import { useRoutes } from './routes';
import bodyParser from 'body-parser';
dotenv.config();

const PORT = process.env.Port || 8090;

const app = express();
app.use(bodyParser.json());
// eslint-disable-next-line react-hooks/rules-of-hooks
useRoutes(app);

app.listen(PORT, () => console.log('Server initiated on port ' + 8090));