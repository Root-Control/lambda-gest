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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeJwtMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const redis_service_1 = require("./@redis/redis.service");
let DecodeJwtMiddleware = class DecodeJwtMiddleware {
    constructor(configService, redisService) {
        this.configService = configService;
        this.redisService = redisService;
    }
    async use(req, res, next) {
        const { privateKey } = this.configService.get('jwt');
        const [, token] = req.headers.authorization.split(' ');
        if (token) {
            try {
                const { userId } = (0, jsonwebtoken_1.verify)(token, privateKey);
                const details = await this.redisService.get(`user-${userId}`);
                if (!details) {
                    return res.status(common_1.HttpStatus.UNAUTHORIZED).send('No user found');
                }
                const { user, currentTeam, background, subcompanies } = details;
                req.user = {
                    ...user,
                    currentTeam,
                    background,
                    subcompanies,
                };
                return next();
            }
            catch (error) {
                console.error('Error decoding token:', error);
            }
        }
        else {
            throw new common_1.HttpException('No token provided', common_1.HttpStatus.BAD_REQUEST);
        }
        next();
    }
};
exports.DecodeJwtMiddleware = DecodeJwtMiddleware;
exports.DecodeJwtMiddleware = DecodeJwtMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        redis_service_1.RedisService])
], DecodeJwtMiddleware);
//# sourceMappingURL=app.token.middleware.js.map