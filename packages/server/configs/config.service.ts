export class ConfigService {
    private readonly env: { [key: string]: string };

    get(key: string): string {
        return process.env[key];
    }

}
