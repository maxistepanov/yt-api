import express from 'express';
import terminal from 'chalk-animation';

// api
import getInfo from './api/get-info';

const app = express();

const router = express.Router();

router.use('/get-info', getInfo);

router.use('/', (req, res) => {
    res.send('It"s works');
});

app.use('/api', router);

app.listen(3000, () => {
    terminal.karaoke('server listening on http://127.0.0.1:' + 3000);
});
