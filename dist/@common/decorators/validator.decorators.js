"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNullable = exports.IsUndefinable = exports.IsTmpKey = exports.IsPhoneNumber = exports.IsPassword = void 0;
const class_validator_1 = require("class-validator");
const lodash_1 = require("lodash");
function IsPassword(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            propertyName: propertyName,
            name: 'isPassword',
            target: object.constructor,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value) {
                    return /^[\d!#$%&*@A-Z^a-z]*$/.test(value);
                },
            },
        });
    };
}
exports.IsPassword = IsPassword;
function IsPhoneNumber(validationOptions) {
    return (0, class_validator_1.IsPhoneNumber)(validationOptions?.region, {
        message: 'error.phoneNumber',
        ...validationOptions,
    });
}
exports.IsPhoneNumber = IsPhoneNumber;
function IsTmpKey(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            propertyName: propertyName,
            name: 'tmpKey',
            target: object.constructor,
            options: validationOptions,
            validator: {
                validate(value) {
                    return (0, lodash_1.isString)(value) && /^tmp\//.test(value);
                },
                defaultMessage() {
                    return 'error.invalidTmpKey';
                },
            },
        });
    };
}
exports.IsTmpKey = IsTmpKey;
function IsUndefinable(options) {
    return (0, class_validator_1.ValidateIf)((_obj, value) => value !== undefined, options);
}
exports.IsUndefinable = IsUndefinable;
function IsNullable(options) {
    return (0, class_validator_1.ValidateIf)((_obj, value) => value !== null, options);
}
exports.IsNullable = IsNullable;
//# sourceMappingURL=validator.decorators.js.map