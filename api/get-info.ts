import { NowRequest, NowResponse } from '@now/node';
import { NowRequestQuery } from '@now/node/dist';
import { videoInfo, getInfo } from 'ytdl-core';
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

        const {
            author,
            formats,
            description,
            media,
            related_videos,
            video_id,
            video_url,
            title,
            length_seconds,
        } = info;

        const videoEntity = plainToClass(VideoEntity, {
            author,
            formats,
            description,
            media,
            related_videos,
            video_id,
            video_url,
            title,
            length_seconds,
        });

        res.json(videoEntity);
    } catch (e) {
        return e;
    }
};
