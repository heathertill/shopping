import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let stores = await queries.Stores.allStores();
        res.json(stores);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/id?', async (req, res, next) => {
    let id = req.params.id;
    try {
        let store = await queries.Stores.oneStore(id);
        res.json(store);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});



export default router;