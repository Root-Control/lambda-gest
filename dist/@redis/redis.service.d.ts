import Redis from 'ioredis';
export declare class RedisService {
    redis: Redis;
    constructor(_redis: Redis);
    set(key: string, value: string | number): void;
    get<T>(key: string): Promise<T>;
    setMultiple(keyValuePairs: {
        key: string;
        value: string;
    }[]): Promise<void>;
    delete(key: string): Promise<void>;
}
