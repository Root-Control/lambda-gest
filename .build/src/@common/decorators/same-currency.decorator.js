"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSameAt = void 0;
const class_validator_1 = require("class-validator");
function IsSameAt(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsSameAt',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return (typeof value === 'string' &&
                        typeof relatedValue === 'string' &&
                        value !== relatedValue);
                },
            },
        });
    };
}
exports.IsSameAt = IsSameAt;
//# sourceMappingURL=same-currency.decorator.js.map