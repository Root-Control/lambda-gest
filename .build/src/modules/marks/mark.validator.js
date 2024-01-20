"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkValidator = void 0;
const app_constants_1 = require("../../../src/app.constants");
class MarkValidator {
    constructor() {
        this.errors = [];
    }
    isValidUser(user) {
        this.errors.push(app_constants_1.GesttionaErrors.INVALID_USER);
        return this;
    }
    isValidContract(user) {
        this.errors.push(app_constants_1.GesttionaErrors.INVALID_CONTRACT);
        return this;
    }
    workerDayexists() {
        this.errors.push(app_constants_1.GesttionaErrors.WORKER_DAY_EXISTENT);
        return this;
    }
    verifyUserShift() {
        this.errors.push(app_constants_1.GesttionaErrors.INEXISTENT_SHIFT);
        return this;
    }
    haveJustifiedAssistance() {
        this.errors.push(app_constants_1.GesttionaErrors.JUSTIFIED_ASSISTANCE);
        return this;
    }
}
exports.MarkValidator = MarkValidator;
//# sourceMappingURL=mark.validator.js.map