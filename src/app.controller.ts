import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { filterFormats, getBasicInfo, getInfo, videoInfo } from 'ytdl-core';
import { VideoEntity } from '../entities/video.entity';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('get-info')
    async get(@Query('url') url: string): Promise<VideoEntity> {
        console.log('get-info', url);
        // formats: filterFormats(info.formats, 'audioonly'),
        //     videoFormat: filterFormats(info.formats, 'videoonly'),
        const info: videoInfo = await getBasicInfo(url);
        console.log('info', info);

        return new VideoEntity(info);
    }
}
