import { NowRequest, NowResponse } from '@now/node';

// db
import { getConnection } from '../database';
import { Video } from '../database/models/video.model';
import {filterFormats, getInfo, videoInfo} from "ytdl-core";
import {classToPlain, plainToClass} from "class-transformer";
import {VideoEntity} from "../entities/video.entity";

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

        const update = await Promise.all(playlist.map(( async (video: Video) => {
            const info: videoInfo = await getInfo(String(video.json.video_id));

            const videoEntity = plainToClass(VideoEntity, {
                ...info,
                formats: filterFormats(info.formats, 'audioonly'),
                videoFormat: filterFormats(info.formats, 'videoonly'),
            });

            return {
                ...video,
                json: classToPlain(videoEntity)
            }
        } )));

        return res.json(update);
    } catch (e) {
        return res.json({ error: true, message: e.toString() });
    }
};

export default request;
