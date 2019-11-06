import * as express from 'express';
import {checkToken} from '../../utils/routerMiddleware'

import itemsRouter from './items';
import storesRouter from './stores';
import listsRouter from './lists';

const router = express.Router();

router.use(checkToken);
router.use('/items', itemsRouter);
router.use('/stores', storesRouter);
router.use('/lists', listsRouter);

export default router;