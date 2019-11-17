import { NowRequest, NowResponse } from '@now/node'
import * as ytdl from 'ytdl-core';
import {NowRequestQuery} from "@now/node/dist";

export default async (req: NowRequest, res: NowResponse) => {
    const { url = '' }: NowRequestQuery = req.query;
    const info = await ytdl.getInfo(String(url));
    res.json(info)
}