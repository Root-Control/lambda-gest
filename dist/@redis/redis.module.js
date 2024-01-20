"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const ioredis_1 = require("ioredis");
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis.service");
const config_1 = require("@nestjs/config");
let RedisModule = RedisModule_1 = class RedisModule {
    static forRoot(params) {
        const redis = new ioredis_1.default({
            host: params.host,
            port: params.port,
        });
        redis.on('connect', () => console.log(`Redis with id=${params.identifier} is now connected`));
        redis.on('error', (err) => console.error(`Redis Client Error (${params.identifier})`, err));
        const redisProvider = {
            provide: params.identifier,
            useValue: redis,
        };
        return {
            module: RedisModule_1,
            providers: [redisProvider, redis_service_1.RedisService],
            exports: [redisProvider, redis_service_1.RedisService],
            global: true,
        };
    }
    static forRootAsync(options) {
        return {
            module: RedisModule_1,
            imports: [config_1.ConfigModule],
            providers: [
                {
                    provide: options.providerId,
                    useFactory: async (configService) => {
                        const { host, port } = await options.useFactory(configService);
                        const redis = new ioredis_1.default({ host, port });
                        redis.on('connect', () => console.log(`Redis is now connected from async`));
                        redis.on('error', (err) => console.error(`Redis Client Error`, err));
                        return redis;
                    },
                    inject: options.inject || [],
                },
                redis_service_1.RedisService,
            ],
            exports: [options.providerId, redis_service_1.RedisService],
        };
    }
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = RedisModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], RedisModule);
//# sourceMappingURL=redis.module.js.map