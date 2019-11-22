import { NowRequest, NowResponse } from '@now/node';

// db
import { getConnection } from '../database';
import { Video } from '../database/models/video.model';

const request = async (req: NowRequest, res: NowResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    try {
        console.time('getConnection');
        const connection = await getConnection();
        console.timeEnd('getConnection');
        const playlistRepository = connection.getRepository(Video);
        const playlist = await playlistRepository.find();

        await connection.close();

        return res.json(playlist);
    } catch (e) {
        return res.json({ error: true, message: e.toString() });
    }
};

export default request;
