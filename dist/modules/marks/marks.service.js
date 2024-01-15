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
let MarksService = class MarksService {
    constructor(markRepository) {
        this.markRepository = markRepository;
    }
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
    __metadata("design:paramtypes", [marks_repository_1.MarkRepository])
], MarksService);
//# sourceMappingURL=marks.service.js.map