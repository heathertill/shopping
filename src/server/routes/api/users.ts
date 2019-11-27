import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/:id', async (req, res, next) => {
    let id = req.params.id
    try {
        let [user] = await queries.Users.findOneById(id);
        res.json(user)
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
})

router.put('/:id', async (req, res, next) => {
    let id = req.params.id;
    let image = req.body;
    try {
        await queries.Users.addImage(image, id);
        res.json({ message: 'Image added!' })
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
    }
})





export default router;