import express from 'express';
import terminal from 'chalk-animation';
import 'reflect-metadata';
import cors from 'cors';
import kill from 'kill-port';

// api
import getInfo from './api/get-info';
import validateUrl from './api/validate-url';

const app = express();
app.use(
    cors({
        origin: '*',
    }),
);

const router = express.Router();

router.use('/get-info', getInfo);
router.use('/validate-url', validateUrl);

router.use('/', (req, res) => {
    res.send('It"s works');
});

app.use('/api', router);

(async () => {
    const port = 3000;
    await kill(port, 'tcp');
    app.listen(port, '0.0.0.0', () => {
        terminal.karaoke('server listening on http://127.0.0.1:' + port);
    });
})();
