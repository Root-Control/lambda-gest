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
exports.MarkQueryDto = exports.MarkDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class MarkDto {
}
exports.MarkDto = MarkDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'The unique identifier of the mark.',
    }),
    __metadata("design:type", Number)
], MarkDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-06T08:36:22Z',
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'The time of the mark.',
    }),
    __metadata("design:type", Date)
], MarkDto.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        format: 'binary',
        nullable: true,
        description: 'The photo associated with the mark.',
    }),
    __metadata("design:type", String)
], MarkDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 40.7128,
        type: 'number',
        nullable: true,
        description: 'The latitude of the mark.',
    }),
    __metadata("design:type", Number)
], MarkDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: -74.006,
        type: 'number',
        nullable: true,
        description: 'The longitude of the mark.',
    }),
    __metadata("design:type", Number)
], MarkDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'The ID of the mark type.' }),
    __metadata("design:type", Number)
], MarkDto.prototype, "mark_type_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'The ID of the location.' }),
    __metadata("design:type", Number)
], MarkDto.prototype, "location_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'The ID of the worker day.' }),
    __metadata("design:type", Number)
], MarkDto.prototype, "worker_day_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-06T08:36:22Z',
        type: 'string',
        format: 'date-time',
        description: 'The creation time of the mark.',
    }),
    __metadata("design:type", Date)
], MarkDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-06T08:36:22Z',
        type: 'string',
        format: 'date-time',
        description: 'The last update time of the mark.',
    }),
    __metadata("design:type", Date)
], MarkDto.prototype, "updated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        nullable: true,
        description: 'The ID of the location status.',
    }),
    __metadata("design:type", Number)
], MarkDto.prototype, "location_status_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        nullable: true,
        description: 'The ID of the shift.',
    }),
    __metadata("design:type", Number)
], MarkDto.prototype, "shift_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
        description: 'Data associated with the mark.',
    }),
    __metadata("design:type", String)
], MarkDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
        description: 'Encrypted data.',
    }),
    __metadata("design:type", String)
], MarkDto.prototype, "crypt_data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, nullable: true, description: 'Admin flag.' }),
    __metadata("design:type", Boolean)
], MarkDto.prototype, "admin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
        description: 'Time parameters.',
    }),
    __metadata("design:type", String)
], MarkDto.prototype, "time_parameters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, nullable: true, description: 'Edit flag.' }),
    __metadata("design:type", Boolean)
], MarkDto.prototype, "edit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-06',
        type: 'string',
        format: 'date',
        nullable: true,
        description: 'The date of the mark.',
    }),
    __metadata("design:type", Date)
], MarkDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        nullable: true,
        description: 'The ID of the management center.',
    }),
    __metadata("design:type", Number)
], MarkDto.prototype, "management_center_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-01-06T08:36:22Z',
        type: 'string',
        format: 'date-time',
        nullable: true,
        description: 'Device time.',
    }),
    __metadata("design:type", Date)
], MarkDto.prototype, "device_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        nullable: true,
        description: 'Use service flag.',
    }),
    __metadata("design:type", Boolean)
], MarkDto.prototype, "use_service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        nullable: true,
        description: 'Time service alert flag.',
    }),
    __metadata("design:type", Boolean)
], MarkDto.prototype, "time_service_alert", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
        description: 'Source of the mark.',
    }),
    __metadata("design:type", String)
], MarkDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 120,
        type: 'number',
        nullable: true,
        description: 'Service time in seconds.',
    }),
    __metadata("design:type", Number)
], MarkDto.prototype, "service_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
        description: 'Response from image processing.',
    }),
    __metadata("design:type", String)
], MarkDto.prototype, "image_response", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 0.85,
        type: 'number',
        nullable: true,
        description: 'Probability from image processing.',
    }),
    __metadata("design:type", Number)
], MarkDto.prototype, "image_probability", void 0);
class MarkQueryDto extends (0, swagger_1.PartialType)(MarkDto) {
}
exports.MarkQueryDto = MarkQueryDto;
//# sourceMappingURL=mark.dto.js.map