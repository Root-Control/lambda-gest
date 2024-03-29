"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkValidator = void 0;
const app_constants_1 = require("../../app.constants");
const moment = require("moment");
class MarkValidator {
    constructor(_user, _date) {
        this.outOfContract = false;
        this.errors = [];
        this.date = moment(_date);
        this.user = _user;
        this.team = _user.currentTeam;
        this.background = _user.background;
    }
    isValidUser() {
        const { currentTeam, subcompany, background } = this.user;
        if (currentTeam.id !== subcompany.team_id ||
            currentTeam.id !== background.team_id) {
            this.errors.push(app_constants_1.GesttionaErrors.INVALID_USER);
        }
        return this;
    }
    isValidContract() {
        const shouldWork = this.shouldWorkAccordingToContract();
        if (!shouldWork) {
            if (!this.team.marksettings_contract_not_restrict_mark) {
                this.errors.push(app_constants_1.GesttionaErrors.INVALID_CONTRACT);
            }
            else {
                this.outOfContract = true;
            }
        }
        return this;
    }
    workerDayexists(workerDay, type) {
        if (workerDay && workerDay.type === type) {
            this.errors.push(app_constants_1.GesttionaErrors.WORKER_DAY_EXISTENT);
        }
        return this;
    }
    verifyUserShift(shift) {
        if (!shift) {
            this.errors.push(app_constants_1.GesttionaErrors.INEXISTENT_SHIFT);
        }
        return this;
    }
    haveJustifiedAssistance(isWorkerDayJustified) {
        if (isWorkerDayJustified) {
            this.errors.push(app_constants_1.GesttionaErrors.JUSTIFIED_ASSISTANCE);
        }
        return this;
    }
    shouldWorkAccordingToContract() {
        const { init_contract, end_contract, indefinite_contract } = this.background;
        if (init_contract) {
            const contractStartdate = moment(init_contract);
            if (indefinite_contract) {
                if (this.date.isSameOrAfter(contractStartdate)) {
                    return true;
                }
            }
            else {
                if (end_contract) {
                    const contractEndDate = moment(end_contract);
                    if (this.date.isSameOrAfter(contractStartdate) &&
                        this.date.isSameOrBefore(contractEndDate)) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
        }
        return true;
    }
}
exports.MarkValidator = MarkValidator;
//# sourceMappingURL=mark.validator.js.map