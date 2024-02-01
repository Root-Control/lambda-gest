"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffInMinutes = exports.isJsonString = exports.getString = exports.getVariableName = void 0;
const moment = require("moment");
function getVariableName(getVar) {
    const m = /\(\)=>(.*)/.exec(getVar.toString().replaceAll(/(\r\n|\n|\r|\s)/gm, ''));
    if (!m) {
        throw new Error("The function does not contain a statement matching 'return variableName;'");
    }
    const fullMemberName = m[1];
    const memberParts = fullMemberName.split('.');
    return memberParts.at(-1);
}
exports.getVariableName = getVariableName;
function getString(key) {
    return key.replaceAll('\\n', '\n');
}
exports.getString = getString;
function isJsonString(string) {
    try {
        JSON.parse(string);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.isJsonString = isJsonString;
function diffInMinutes(time1, time2) {
    const formattedTime1 = moment(time1, 'HH:mm:ss');
    const formattedTime2 = moment(time2, 'HH:mm:ss');
    return Math.abs(formattedTime1.diff(formattedTime2, 'minutes'));
}
exports.diffInMinutes = diffInMinutes;
//# sourceMappingURL=utils.js.map