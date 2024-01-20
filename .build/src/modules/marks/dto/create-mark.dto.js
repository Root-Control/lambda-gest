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
exports.CreateMarkDto = void 0;
const field_decorators_1 = require("../../../@common/decorators/field.decorators");
class CreateMarkDto {
}
exports.CreateMarkDto = CreateMarkDto;
__decorate([
    (0, field_decorators_1.NumberField)(),
    __metadata("design:type", Number)
], CreateMarkDto.prototype, "timeOffline", void 0);
__decorate([
    (0, field_decorators_1.DateField)(),
    __metadata("design:type", Date)
], CreateMarkDto.prototype, "date", void 0);
__decorate([
    (0, field_decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateMarkDto.prototype, "time", void 0);
__decorate([
    (0, field_decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateMarkDto.prototype, "mark_type", void 0);
__decorate([
    (0, field_decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateMarkDto.prototype, "img", void 0);
__decorate([
    (0, field_decorators_1.NumberField)(),
    __metadata("design:type", Number)
], CreateMarkDto.prototype, "location", void 0);
__decorate([
    (0, field_decorators_1.StringField)(),
    __metadata("design:type", String)
], CreateMarkDto.prototype, "status_location", void 0);
__decorate([
    (0, field_decorators_1.DateField)(),
    __metadata("design:type", String)
], CreateMarkDto.prototype, "realDate", void 0);
__decorate([
    (0, field_decorators_1.StringFieldOptional)({ nullable: true }),
    __metadata("design:type", String)
], CreateMarkDto.prototype, "latitude", void 0);
__decorate([
    (0, field_decorators_1.StringFieldOptional)({ nullable: true }),
    __metadata("design:type", String)
], CreateMarkDto.prototype, "longitude", void 0);
__decorate([
    (0, field_decorators_1.StringFieldOptional)({ nullable: true, minLength: 0 }),
    __metadata("design:type", String)
], CreateMarkDto.prototype, "photo", void 0);
//# sourceMappingURL=create-mark.dto.js.map