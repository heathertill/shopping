import * as path from 'path';
import * as express from 'express';
import * as passport from 'passport';
import * as morgan from 'morgan';
import * as SocketIO from 'socket.io';
import * as http from 'http';

import './middleware/bearerstrategy';
import './middleware/localstrategy';

import routes from './routes';

const app = express();
const server = new http.Server(app);
export const io = SocketIO(server);

let p = path.join(__dirname, '../public');
console.log(p);

app.use(express.static(p));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

io.on('connection', (socket: any) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
});

app.use(routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});
