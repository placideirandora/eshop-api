import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import express, { Request, Response } from 'express';

import { indexRouter } from './api';
import { STATUS_CODES } from './constants';
import { environment } from './config/environment';

dotenv.config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/v1', indexRouter);

app.use((req: Request, res: Response) => {
  res.status(STATUS_CODES.NOT_FOUND).json({
    status: STATUS_CODES.NOT_FOUND,
    error: 'Endpoint route not found',
  });
});

const startServer = async () => {
  try {
    await mongoose.set('strictQuery', false).connect(environment.databaseUrl);
    app.listen(environment.port, () =>
      console.log(`Server is listening on port ${environment.port}`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
