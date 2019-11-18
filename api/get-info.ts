import { NowRequest, NowResponse } from '@now/node';
import { NowRequestQuery } from '@now/node/dist';
import * as ytdl from 'ytdl-core';

export default async (req: NowRequest, res: NowResponse) => {
    try {
        const { url = '' }: NowRequestQuery = req.query;
        if (!url) {
            return res.status(422).json({
                error: 'Url is required',
            });
        }
        const info = await ytdl.getInfo(String(url));
        res.json(info);
    } catch (e) {
        return e;
    }
};
