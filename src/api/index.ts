import { Router } from 'express';

import { authRouter } from './auth';
import { productRouter } from './product';

export const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/product', productRouter);
