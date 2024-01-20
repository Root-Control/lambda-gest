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
exports.AbstractApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let AbstractApiService = class AbstractApiService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    getTime(timezone) {
        const { apiKey, endpoint } = this.configService.get('abstract');
        const url = `${endpoint}/current_time?api_key=${apiKey}&location=${timezone}`;
        const request$ = this.httpService.get(url).pipe((0, rxjs_1.map)(res => res.data));
        return (0, rxjs_1.lastValueFrom)(request$);
    }
};
exports.AbstractApiService = AbstractApiService;
exports.AbstractApiService = AbstractApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AbstractApiService);
//# sourceMappingURL=abstract-api.service.js.map