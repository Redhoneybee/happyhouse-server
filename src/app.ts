import express from "express";
const cors = require("cors");
const app: express.Application = express();

import indexRouter from './routes/index';
app.use(cors());
app.use('/api', indexRouter);

export default app;