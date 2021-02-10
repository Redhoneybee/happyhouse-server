import express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import indexRouter from './routes/index';
const app: express.Application = express();

app.use(cors.default());
app.use(bodyParser.json());
app.use('/api', indexRouter);

export default app;