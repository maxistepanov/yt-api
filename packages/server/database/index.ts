import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as dotenv from 'dotenv';

// Models
import { Video } from './models/video.model';

dotenv.config();

export const getConnection = () =>
    createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [Video],
        synchronize: true,
        logging: false,
    });
