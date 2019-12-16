import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
    private readonly env: { [key: string]: string };

    constructor(filePath: string) {
        try {
            this.env = dotenv.parse(fs.readFileSync(filePath));

            Object.entries(this.env).forEach(([key, value]) => {
                process.env[key] = value;
            });
        } catch (e) {
            console.log('file env not found')
        }
    }

    get(key: string): string {
        return this.env[key];
    }

}
