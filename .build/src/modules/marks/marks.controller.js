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
exports.MarkController = void 0;
const common_1 = require("@nestjs/common");
const marks_service_1 = require("./marks.service");
const swagger_1 = require("@nestjs/swagger");
const mark_dto_1 = require("./dto/mark.dto");
const create_mark_dto_1 = require("./dto/create-mark.dto");
const enums_1 = require("../../@common/gesttiona-constants/enums");
let MarkController = class MarkController {
    constructor(marksService) {
        this.marksService = marksService;
    }
    findAll(query) {
        return this.marksService.find(query);
    }
    mark(request, createMarkDto) {
        if (createMarkDto.mark_type !== enums_1.MarkTypes.CHECKPOINT) {
            return this.marksService.executeMark(createMarkDto, request.user);
        }
        else {
            return this.marksService.executeCheckpointMark(createMarkDto, request.user);
        }
    }
    findById(id) {
        console.log(1);
        return this.marksService.findById(id);
    }
};
exports.MarkController = MarkController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all marks' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of marks',
        type: [mark_dto_1.MarkDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mark_dto_1.MarkQueryDto]),
    __metadata("design:returntype", Promise)
], MarkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('execute-mark'),
    (0, swagger_1.ApiOperation)({ summary: 'Perform Mark' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'List of marks',
        type: [mark_dto_1.MarkDto],
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_mark_dto_1.CreateMarkDto]),
    __metadata("design:returntype", void 0)
], MarkController.prototype, "mark", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get mark by Id' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Mark By Id',
        type: mark_dto_1.MarkDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MarkController.prototype, "findById", null);
exports.MarkController = MarkController = __decorate([
    (0, swagger_1.ApiTags)('Marks'),
    (0, common_1.Controller)('marks'),
    __metadata("design:paramtypes", [marks_service_1.MarksService])
], MarkController);
//# sourceMappingURL=marks.controller.js.map