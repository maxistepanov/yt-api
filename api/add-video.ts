import { NowRequest, NowResponse } from '@now/node';
import { videoInfo } from 'ytdl-core';

// db
import { getConnection } from '../database';
import { Video } from '../database/models/video.model';

const request = async (req: NowRequest, res: NowResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.body && req.body.video) {
        const payload: videoInfo = req.body.video;

        console.time('getConnection');
        const connection = await getConnection();
        console.timeEnd('getConnection');

        const video = new Video({
            ...payload,
            name: payload.title,
        });

        const result = await connection.manager.save(new Video(video));

        await connection.close();
        return res.json(result);
    }

    return res.json({ error: true });
};

export default request;
