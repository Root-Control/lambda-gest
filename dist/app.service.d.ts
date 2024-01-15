export declare class AppService {
    getHello(): string;
    getTime(timeZone: string): {
        utc: string;
        tzTime: string;
    };
    getTimezones(): string[];
}
