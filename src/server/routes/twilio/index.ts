import * as express from 'express';
import config from '../../config';
const client = require('twilio')(config.twilio.accountSID, config.twilio.authToken);

const router = express.Router();

router.post('/', (req, res) => {
    res.header('Content-type', 'application/json');
    client.messages
        .create({
            from: config.twilio.twilioNumber,
            to: req.body.to,
            body: req.body.body
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch((e: any) => {
            console.log(e);
            res.send(JSON.stringify({ success: false }));
        });
});

export default router;