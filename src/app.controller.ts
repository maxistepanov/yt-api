import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { filterFormats, getInfo, videoInfo } from 'ytdl-core';
import { VideoEntity } from '../entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../database/models/video.model';
import { classToPlain } from 'class-transformer';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AppController {
    constructor(
        @InjectRepository(Video)
        private readonly playlistRepository: Repository<Video>,
        private readonly appService: AppService,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('get-info')
    async get(@Query('url') url: string): Promise<any> {
        const info: videoInfo = await getInfo(url);

        return new VideoEntity({
            ...info,
            formats: filterFormats(info.formats, 'audioonly'),
            videoFormat: filterFormats(info.formats, 'videoonly'),
        });
    }

    @Post('add-video')
    async addVideo(@Body() payload) {
        const video = new Video({
            name: payload.video.title,
            videoId: payload.video.video_id,
        });

        return this.playlistRepository.save(new Video(video));
    }

    @Get('get-playlist')
    async getPlaylist(): Promise<any> {
        const playlist = await this.playlistRepository.find();
        return Promise.all(
            playlist.map(async (video: Video) => {
                const info: videoInfo = await getInfo(String(video.videoId));
                const json = new VideoEntity(info);

                return {
                    ...video,
                    json: classToPlain(json),
                };
            }),
        );
    }
}
