"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarksModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mark_model_1 = require("./mark.model");
const marks_controller_1 = require("./marks.controller");
const marks_service_1 = require("./marks.service");
const marks_repository_1 = require("./marks.repository");
let MarksModule = class MarksModule {
};
exports.MarksModule = MarksModule;
exports.MarksModule = MarksModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([mark_model_1.Mark])],
        controllers: [marks_controller_1.MarkController],
        providers: [marks_service_1.MarksService, marks_repository_1.MarkRepository],
    })
], MarksModule);
//# sourceMappingURL=marks.module.js.map