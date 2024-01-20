"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./@database/config/database.module");
const marks_1 = require("./modules/marks");
const app_token_middleware_1 = require("./app.token.middleware");
const config_1 = require("@nestjs/config");
const redis_module_1 = require("./@redis/redis.module");
const configuration_1 = require("./config/configuration");
const redis_const_1 = require("./@redis/redis.const");
const _third_party_services_1 = require("./modules/@third-party-services");
const axios_1 = require("@nestjs/axios");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(app_token_middleware_1.DecodeJwtMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            redis_module_1.RedisModule.forRootAsync({
                providerId: redis_const_1.RedisClientIds.main,
                useFactory: async (configService) => {
                    const { host, port } = configService.get('redis');
                    return { host, port };
                },
                inject: [config_1.ConfigService],
            }),
            axios_1.HttpModule,
            database_module_1.DatabaseModule,
            _third_party_services_1.ThirdPartyServicesModule,
            marks_1.MarksModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map