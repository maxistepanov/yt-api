import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../configs/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../database/models/video.model';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Video])],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
