import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Post,
    Query,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { getInfo, videoInfo } from 'ytdl-core';
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
        try {
            const [info] = await Promise.all([getInfo(url)]);

            return new VideoEntity(info);
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    @Post('add-video')
    async add(@Body() payload: videoInfo, @Res() res) {
        const video = new Video({
            name: payload.title,
            title: payload.title,
            videoId: payload.video_id,
            formats: payload.formats,
        });

        return this.playlistRepository.save(new Video(video));
    }

    @Post('remove-video')
    async remove(@Body() payload) {
        const video = await this.playlistRepository.findOne(payload.id);
        if (video) {
            return this.playlistRepository.remove(video);
        }

        throw new NotFoundException();
    }

    @Get('get-playlist')
    async getPlaylist(): Promise<any> {
        try {
            const playlist = await this.playlistRepository.find();
            return Promise.all(
                playlist.map(async (video: Video) => {
                    const info: videoInfo = await getInfo(
                        String(video.videoId),
                    );
                    const json = new VideoEntity(info);

                    return {
                        ...video,
                        json: classToPlain(json),
                    };
                }),
            );
        } catch (e) {
            return e;
        }
    }
}
