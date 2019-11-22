import { NowRequest, NowResponse } from '@now/node';
import { NowRequestQuery } from '@now/node/dist';
import { videoInfo, getInfo, filterFormats } from 'ytdl-core';
import { plainToClass } from 'class-transformer';
import 'reflect-metadata';

// Entities
import { VideoEntity } from '../entities/video.entity';

export default async (req: NowRequest, res: NowResponse) => {
    try {
        const { url = '' }: NowRequestQuery = req.query;
        if (!url) {
            return res.status(422).json({
                error: 'Url is required',
            });
        }

        const info: videoInfo = await getInfo(String(url));

        const videoEntity = plainToClass(VideoEntity, {
            ...info,
            formats: filterFormats(info.formats, 'audioonly'),
            videoFormat: filterFormats(info.formats, 'videoonly'),
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.json(videoEntity);
    } catch (e) {
        return e;
    }
};
