import * as express from 'express';
import * as passport from 'passport';
import { Request } from 'express-serve-static-core';


import { CreateToken } from '../../utils/security/token';

const router = express.Router();

interface ReqUser extends Request {
    user: {
        id: number,
        role: string
}
}

router.post('/', passport.authenticate('local'), async (req: ReqUser, res, next) => {
    console.log(req.user)
    try {
        let token = await CreateToken({ userid: req.user.id });
        res.json({
            token,
            role: req.user.role,
            userid: req.user.id
        })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;