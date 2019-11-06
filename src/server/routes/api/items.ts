import { Router } from 'express';
import queries from '../../db';
import { io } from '../../server';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let items = await queries.Items.allItems();
        res.json(items);
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
});

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let [item] = await queries.Items.oneItem(id);
        res.json(item);
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
});

router.post('/', async (req, res, next) => {
    let itemObject = req.body;
    try {
        let item = await queries.Items.createItem(itemObject);
        io.emit('newitem')
        res.json(item);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/id', async (req, res, next) => {
    let id = req.params.id;
    let body = req.body;
    try {
        await queries.Items.updateItem(body, id);
        res.json({ message: 'Item updated!' });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/id', async (req, res, next) => {
    let id = req.params.id;
    try {
        await queries.Items.deleteItem(id);
        res.json({ message: 'Item Deleted!' });
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
})

export default router;