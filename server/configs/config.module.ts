import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// services
import { ConfigService } from './config.service';
import { TypeOrmConfigService } from './typeOrmConfig.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService,
        }),
    ],
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(
                `${process.env.NODE_ENV || 'development'}.env`,
            ),
        },
    ],
    exports: [ConfigService, TypeOrmModule],
})
export class ConfigModule {}
