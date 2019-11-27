import * as express from 'express';
import {checkToken} from '../../utils/routerMiddleware'

import itemsRouter from './items';
import storesRouter from './stores';
import listsRouter from './lists';
import usersRouter from './users';

const router = express.Router();

router.use(checkToken);
router.use('/items', itemsRouter);
router.use('/stores', storesRouter);
router.use('/lists', listsRouter);
router.use('/users', usersRouter);

export default router;