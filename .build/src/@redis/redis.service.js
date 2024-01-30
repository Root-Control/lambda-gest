"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_const_1 = require("./redis.const");
const utils_1 = require("../@common/utilities/utils");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    constructor(_redis) {
        this.redis = _redis;
    }
    set(key, value) {
        value = typeof value === 'object' ? JSON.stringify(value) : value;
        this.redis.set(key, value);
    }
    get(key) {
        return new Promise((resolve) => {
            this.redis.get(key, (err, data) => {
                if (data) {
                    if ((0, utils_1.isJsonString)(data))
                        resolve(JSON.parse(data));
                    else
                        resolve(data);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    async setMultiple(keyValuePairs) {
        const pipeline = this.redis.pipeline();
        keyValuePairs.forEach(({ key, value }) => {
            pipeline.set(key, value);
        });
        await pipeline.exec();
    }
    async delete(key) {
        this.redis.del(key);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(redis_const_1.RedisClientIds.main)),
    __metadata("design:paramtypes", [ioredis_1.default])
], RedisService);
//# sourceMappingURL=redis.service.js.map