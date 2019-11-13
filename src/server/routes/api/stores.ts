import { Router } from 'express';
import queries from '../../db';
import { async } from 'q';

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

router.post('/', async (req, res, next) => {
    let body = req.body;
    try {
        let newStore = await queries.Stores.newStore(body);
        res.json(newStore);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        await queries.Stores.deleteStore(id);
        res.json({message: 'Store deleted!'})
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;