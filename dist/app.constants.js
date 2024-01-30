"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GesttionaWarnings = exports.GesttionaErrors = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType["ACCESS_TOKEN"] = "ACCESS_TOKEN";
    TokenType["REFRESH_TOKEN"] = "REFRESH_TOKEN";
})(TokenType || (exports.TokenType = TokenType = {}));
var GesttionaErrors;
(function (GesttionaErrors) {
    GesttionaErrors["INVALID_CONTRACT"] = "Usuario fuera de contrato";
    GesttionaErrors["INVALID_USER"] = "Usuario Inv\u00E1lido";
    GesttionaErrors["WORKER_DAY_EXISTENT"] = "Usuario ya marc\u00F3 y su worker day existe";
    GesttionaErrors["INEXISTENT_SHIFT"] = "Turno no existe";
    GesttionaErrors["JUSTIFIED_ASSISTANCE"] = "Posee ausencia justificada";
})(GesttionaErrors || (exports.GesttionaErrors = GesttionaErrors = {}));
var GesttionaWarnings;
(function (GesttionaWarnings) {
    GesttionaWarnings["ERROR_UPLOADING_IMAGE"] = "Error al almacenar la imagen";
})(GesttionaWarnings || (exports.GesttionaWarnings = GesttionaWarnings = {}));
//# sourceMappingURL=app.constants.js.map