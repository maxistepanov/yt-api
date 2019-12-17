import * as dotenv from 'dotenv';

export class ConfigService {
    private readonly env: { [key: string]: string };

    constructor(){
        dotenv.config();
    }

    get(key: string): string {
        return process.env[key];
    }

}
