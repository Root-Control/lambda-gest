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
exports.RequestMarkDto = void 0;
const field_decorators_1 = require("../../../@common/decorators/field.decorators");
class RequestMarkDto {
}
exports.RequestMarkDto = RequestMarkDto;
__decorate([
    (0, field_decorators_1.StringField)(),
    __metadata("design:type", String)
], RequestMarkDto.prototype, "time", void 0);
__decorate([
    (0, field_decorators_1.BooleanField)(),
    __metadata("design:type", Boolean)
], RequestMarkDto.prototype, "isValid", void 0);
__decorate([
    (0, field_decorators_1.StringField)({ each: true }),
    __metadata("design:type", Array)
], RequestMarkDto.prototype, "errors", void 0);
__decorate([
    (0, field_decorators_1.StringField)(),
    __metadata("design:type", String)
], RequestMarkDto.prototype, "device_time", void 0);
__decorate([
    (0, field_decorators_1.StringField)(),
    __metadata("design:type", String)
], RequestMarkDto.prototype, "service_time", void 0);
__decorate([
    (0, field_decorators_1.BooleanField)(),
    __metadata("design:type", Boolean)
], RequestMarkDto.prototype, "user_service", void 0);
__decorate([
    (0, field_decorators_1.BooleanField)(),
    __metadata("design:type", Boolean)
], RequestMarkDto.prototype, "time_service_alert", void 0);
__decorate([
    (0, field_decorators_1.StringField)(),
    __metadata("design:type", String)
], RequestMarkDto.prototype, "latitude", void 0);
__decorate([
    (0, field_decorators_1.StringField)(),
    __metadata("design:type", String)
], RequestMarkDto.prototype, "longitude", void 0);
__decorate([
    (0, field_decorators_1.NumberField)(),
    __metadata("design:type", Number)
], RequestMarkDto.prototype, "mark_type_id", void 0);
__decorate([
    (0, field_decorators_1.NumberField)(),
    __metadata("design:type", Number)
], RequestMarkDto.prototype, "location_id", void 0);
__decorate([
    (0, field_decorators_1.NumberField)(),
    __metadata("design:type", Number)
], RequestMarkDto.prototype, "location_status_id", void 0);
__decorate([
    (0, field_decorators_1.NumberField)(),
    __metadata("design:type", String)
], RequestMarkDto.prototype, "date", void 0);
__decorate([
    (0, field_decorators_1.NumberFieldOptional)(),
    __metadata("design:type", Number)
], RequestMarkDto.prototype, "management_center_id", void 0);
//# sourceMappingURL=create-mark.dto.js.map