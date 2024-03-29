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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const redis_service_1 = require("./@redis/redis.service");
let AppController = class AppController {
    constructor(appService, redisService) {
        this.appService = appService;
        this.redisService = redisService;
    }
    test() {
        return this.appService.config();
    }
    getTime(timezone) {
        return this.appService.getTime(timezone);
    }
    getTimezones() {
        return this.appService.getTimezones();
    }
    redisSet(body) {
        this.redisService.set(body.key, body.value);
        return 'Setted';
    }
    async redisGet(key) {
        return this.redisService.get(key);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "test", null);
__decorate([
    (0, common_1.Get)('get-time'),
    __param(0, (0, common_1.Query)('timezone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTime", null);
__decorate([
    (0, common_1.Get)('timezones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTimezones", null);
__decorate([
    (0, common_1.Post)('redis-set'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "redisSet", null);
__decorate([
    (0, common_1.Get)('redis-get'),
    __param(0, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "redisGet", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        redis_service_1.RedisService])
], AppController);
//# sourceMappingURL=app.controller.js.map