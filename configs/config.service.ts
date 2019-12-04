import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
    private readonly env: { [key: string]: string };

    constructor(filePath: string) {
        // this.env = dotenv.parse(fs.readFileSync(filePath));
        this.env = {
            DB_HOST: "ytdb.cnuhqjgdpwa7.us-east-2.rds.amazonaws.com",
            DB_USER: "admin",
            DB_PASS: "novatel720",
            DB_NAME: "ytdb",
        };

        Object.entries(this.env).forEach(([key, value]) => {
            process.env[key] = value;
        });
    }

    get(key: string): string {
        return this.env[key];
    }

}
