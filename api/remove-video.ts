import { NowRequest, NowResponse } from '@now/node';
import { videoInfo } from 'ytdl-core';

// db
import { getConnection } from '../database';
import { Video } from '../database/models/video.model';

const request = async (req: NowRequest, res: NowResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.body && req.body.id) {
        console.time('getConnection');
        const connection = await getConnection();
        console.timeEnd('getConnection');
        const repository = connection.getRepository(Video);
        const track = await repository.findOne({ id: req.body.id });
        if (track) {
            await repository.remove(track);
        }

        await connection.close();
        return res.json({ success: true });
    }

    return res.json({ error: true });
};

export default request;
