import { NowRequest, NowResponse } from '@now/node';
import { NowRequestQuery } from '@now/node/dist';
import { validateURL } from 'ytdl-core';

export default async (req: NowRequest, res: NowResponse) => {
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
