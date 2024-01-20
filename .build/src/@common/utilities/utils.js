"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJsonString = exports.getString = exports.getVariableName = void 0;
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
//# sourceMappingURL=utils.js.map