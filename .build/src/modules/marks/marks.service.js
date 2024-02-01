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
exports.MarksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const marks_repository_1 = require("./marks.repository");
const mark_dto_1 = require("./dto/mark.dto");
const class_transformer_1 = require("class-transformer");
const mark_model_1 = require("./mark.model");
const abstract_api_service_1 = require("../@third-party-services/abstract-api/abstract-api.service");
const mark_validator_1 = require("./mark.validator");
const redis_service_1 = require("src/@redis/redis.service");
const moment = require("moment");
const enums_1 = require("../../@common/types/enums");
const uuid_1 = require("uuid");
const microservices_1 = require("@nestjs/microservices");
const utils_1 = require("@common/utilities/utils");
const MARK_PATTERN = 'mark';
let MarksService = class MarksService {
    constructor(markRepository, abstractApiService, redisService, client) {
        this.markRepository = markRepository;
        this.abstractApiService = abstractApiService;
        this.redisService = redisService;
        this.client = client;
    }
    async executeMark(requestMarkDto, user) {
        const tmpKey = (0, uuid_1.v4)();
        const { date } = requestMarkDto;
        let realDate;
        const locationKey = `location_${requestMarkDto.location}`;
        const markTypeKey = `mark_type_${requestMarkDto.mark_type}`;
        const workerDayPattern = `${date}_${user.id}_${user.currentTeam.id}`;
        const workerDayJustification = `${workerDayPattern}_justification`;
        const shiftPattern = `shift`;
        const shiftUserKey = `${shiftPattern}_${user.currentTeam.id}_${user.id}`;
        const markValidator = new mark_validator_1.MarkValidator(user, date);
        let workerDay = await this.redisService.get(workerDayPattern);
        const workerDayJustificationExists = await this.redisService.get(workerDayJustification);
        let shiftId = null;
        const markType = await this.redisService.get(markTypeKey);
        if (requestMarkDto.shift) {
            const shiftKey = `${shiftPattern}_${requestMarkDto.shift}`;
            shiftId = await this.redisService.get(shiftKey);
        }
        else {
            shiftId = await this.redisService.get(shiftUserKey);
        }
        let locationStatus = null;
        switch (requestMarkDto.status_location) {
            case enums_1.Statuslocations.NO_GPS:
                locationStatus = await this.redisService.get(`mark_location_status_gps_disabled`);
                break;
            case enums_1.Statuslocations.NOT_FOUND:
                locationStatus = await this.redisService.get(`mark_location_status_outside_allowed_area`);
                break;
            case enums_1.Statuslocations.FOUND:
            case enums_1.Statuslocations.FOUND_PLUS:
                locationStatus = await this.redisService.get(`mark_location_status_ok`);
                break;
        }
        const location = await this.redisService.get(locationKey);
        if (requestMarkDto.realDate &&
            moment(requestMarkDto.realDate, 'YYYY-MM-DD', true).isValid()) {
            realDate = requestMarkDto.realDate;
        }
        try {
            markValidator
                .isValidUser()
                .isValidContract()
                .workerDayexists(workerDay, requestMarkDto.mark_type)
                .verifyUserShift(shiftId)
                .haveJustifiedAssistance(workerDayJustificationExists);
            const { errors, outOfContract } = markValidator;
            if (!workerDay) {
                workerDay = {
                    date,
                    shift_id: shiftId,
                    user_id: user.id,
                    team_id: user.currentTeam.id,
                    tmpKey,
                    type: requestMarkDto.mark_type,
                };
            }
            const payload = {
                data: {
                    name: `${user.name} ${user.lastname}`,
                    second_id_number: 'TODO',
                    id_number: user.id_number,
                    org_name: user.currentTeam.name,
                    markType: requestMarkDto.mark_type,
                    time: requestMarkDto.time,
                    location_name: location.name,
                    location_address: location.location_address,
                    schedule_start: 'ToFill',
                    schedule_lunch: 'ToFill',
                    schedule_end: 'ToFill',
                    subcompany_id_number: user.subcompany.id,
                    subcompany_business_name: user.subcompany.business_name,
                    subcompany_address: user.subcompany.address,
                    date: moment(date),
                },
                mark: {
                    tmpKey,
                    time: requestMarkDto.time,
                    photo: 'ToFill',
                    latitude: requestMarkDto.latitude,
                    longitude: requestMarkDto.longitude,
                    mark_type_id: markType.id,
                    location_id: location.id,
                    worker_day_id: null,
                    shift_id: shiftId,
                    date: realDate,
                    data: 'ToFillFromDataObject',
                    crypt_data: 'ToFillEncryptedDataObject',
                    location_status_id: locationStatus.id,
                    source: requestMarkDto.source || null,
                    management_center_id: requestMarkDto.management_center_id || null,
                    errors,
                    valid: errors.length ? false : true,
                    device_time: requestMarkDto.time,
                    use_service: false,
                    service_time: null,
                    time_service_alert: false,
                },
                workerDay,
                metadata: {
                    outOfContract,
                },
            };
            const { location_name } = user.currentTeam.country;
            this.validateAndSendToQueue(location_name, payload);
        }
        catch (ex) {
            console.log(ex);
        }
        return true;
    }
    async validateAndSendToQueue(location_name, payload) {
        const result = await this.abstractApiService.getTime(location_name);
        if (result) {
            const [, time] = result.datetime.split(' ');
            const deviceTime = payload.data.time;
            payload.mark.use_service = true;
            payload.mark.service_time = time;
            payload.mark.time_service_alert = (0, utils_1.diffInMinutes)(deviceTime, time) > 15;
        }
        console.log('Sending to Rabbit');
        this.client.emit(MARK_PATTERN, payload);
    }
    async executeCheckpointMark(requestMarkDto, user) { }
    async find(query) {
        try {
            query.take = 10;
            const marks = await this.markRepository.find(query);
            console.log(1);
            return marks.map((mark) => (0, class_transformer_1.plainToClass)(mark_dto_1.MarkDto, mark));
        }
        catch (ex) {
            console.log(2);
            throw new common_1.HttpException(ex, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async findById(markId) {
        try {
            const mark = await this.markRepository.findOne({ where: { id: markId } });
            return (0, class_transformer_1.plainToClass)(mark_dto_1.MarkDto, mark);
        }
        catch (ex) {
            throw new common_1.HttpException(ex, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
};
exports.MarksService = MarksService;
exports.MarksService = MarksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(mark_model_1.Mark)),
    __param(3, (0, common_1.Inject)('RABBITMQ_SERVICE')),
    __metadata("design:paramtypes", [marks_repository_1.MarkRepository,
        abstract_api_service_1.AbstractApiService,
        redis_service_1.RedisService,
        microservices_1.ClientProxy])
], MarksService);
//# sourceMappingURL=marks.service.js.map