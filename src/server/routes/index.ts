import * as express from 'express';

import apiRouter from './api';
import authRouter from './auth';
import twilioRouter from './twilio';
import multerRouter from './multer';

const router = express.Router();

router.use('/api', apiRouter);
router.use('/auth', authRouter);
router.use('/twilio', twilioRouter);
router.use('/multer', multerRouter)

export default router;