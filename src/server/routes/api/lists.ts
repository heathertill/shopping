import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let list = await queries.Items.storeItems();
        res.json(list);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let list = await queries.Items.oneStoreItems(id);
        res.json(list);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res, next) => {
    let id = req.params.id;
    let storeid = req.body;
    try {
        await queries.Items.addStoreid(storeid, id);
        res.json({ message: 'Storeid added' });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})


export default router;