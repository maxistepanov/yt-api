import { NowRequest, NowResponse } from '@now/node';
import { NowRequestQuery } from '@now/node/dist';
import { validateURL } from 'ytdl-core';

// db
import { getConnection } from '../database';
import { Video } from '../database/models/video.model';

export default async (req: NowRequest, res: NowResponse) => {
    console.time('getConnection');
    const connection = await getConnection();
    console.timeEnd('getConnection');
    let photo = new Video({
        name: 'Me and Bears 123',
    });

    const photoObj = await connection.manager.save(photo);

    await connection.close();

    console.log('Photo has been saved. Photo id is', photoObj.id);

    try {
        const { url = '' }: NowRequestQuery = req.query;
        if (!url) {
            return res.status(422).json({
                error: 'Url is required',
            });
        }

        const valid: boolean = await validateURL(String(url));

        res.json({ valid });
    } catch (e) {
        return e;
    }
};
