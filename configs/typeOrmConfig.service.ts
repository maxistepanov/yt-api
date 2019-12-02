import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

// services
import { ConfigService } from './config.service';
import {Video} from "../database/models/video.model";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly config: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.config.get('DB_HOST'),
            port: +this.config.get('DB_PORT'),
            username: this.config.get('DB_USER'),
            password: this.config.get('DB_PASS'),
            database: this.config.get('DB_NAME'),
            entities: [
                Video
            ],
            synchronize: true,
            migrations: ['migration/*.js'],
            cli: {
                migrationsDir: 'migration',
            },
        };
    }
}
