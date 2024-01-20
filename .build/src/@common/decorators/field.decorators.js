"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFieldOptional = exports.DateField = exports.URLFieldOptional = exports.URLField = exports.UUIDFieldOptional = exports.UUIDField = exports.PhoneFieldOptional = exports.PhoneField = exports.EmailFieldOptional = exports.EmailField = exports.ClassFieldOptional = exports.EnumFieldOptional = exports.ClassField = exports.EnumField = exports.TmpKeyFieldOptional = exports.TmpKeyField = exports.BooleanFieldOptional = exports.BooleanField = exports.PasswordFieldOptional = exports.PasswordField = exports.StringFieldOptional = exports.StringField = exports.CurrencyField = exports.NumberFieldOptional = exports.NumberField = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const property_decorators_1 = require("./property.decorators");
const transform_decorators_1 = require("./transform.decorators");
const validator_decorators_1 = require("./validator.decorators");
function NumberField(options = {}) {
    const decorators = [(0, class_transformer_1.Type)(() => Number)];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)({ each: options.each }));
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null, { each: options.each }));
    }
    if (options.swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)({ type: Number, ...options }));
    }
    if (options.each) {
        decorators.push((0, transform_decorators_1.ToArray)());
    }
    if (options.int) {
        decorators.push((0, class_validator_1.IsInt)({ each: options.each }));
    }
    else {
        decorators.push((0, class_validator_1.IsNumber)({}, { each: options.each }));
    }
    if (typeof options.min === 'number') {
        decorators.push((0, class_validator_1.Min)(options.min, { each: options.each }));
    }
    if (typeof options.max === 'number') {
        decorators.push((0, class_validator_1.Max)(options.max, { each: options.each }));
    }
    if (options.isPositive) {
        decorators.push((0, class_validator_1.IsPositive)({ each: options.each }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.NumberField = NumberField;
function NumberFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), NumberField({ required: false, ...options }));
}
exports.NumberFieldOptional = NumberFieldOptional;
function CurrencyField(options = {}) {
    const decorators = [(0, class_transformer_1.Type)(() => String), (0, class_validator_1.IsString)({ each: options.each })];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)({ each: options.each }));
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null, { each: options.each }));
    }
    if (options.swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)({ type: String, ...options, isArray: options.each }));
    }
    decorators.push((0, class_validator_1.MaxLength)(3, { each: options.each }));
    if (options.toUpperCase) {
        decorators.push((0, transform_decorators_1.ToUpperCase)());
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.CurrencyField = CurrencyField;
function StringField(options = {}) {
    const decorators = [(0, class_transformer_1.Type)(() => String), (0, class_validator_1.IsString)({ each: options.each })];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)({ each: options.each }));
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null, { each: options.each }));
    }
    if (options.swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)({ type: String, ...options, isArray: options.each }));
    }
    const minLength = options.minLength || 0;
    decorators.push((0, class_validator_1.MinLength)(minLength, { each: options.each }));
    if (options.maxLength) {
        decorators.push((0, class_validator_1.MaxLength)(options.maxLength, { each: options.each }));
    }
    if (options.toLowerCase) {
        decorators.push((0, transform_decorators_1.ToLowerCase)());
    }
    if (options.toUpperCase) {
        decorators.push((0, transform_decorators_1.ToUpperCase)());
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.StringField = StringField;
function StringFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), StringField({ required: false, ...options }));
}
exports.StringFieldOptional = StringFieldOptional;
function PasswordField(options = {}) {
    const decorators = [StringField({ ...options, minLength: 6 }), (0, validator_decorators_1.IsPassword)()];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)());
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.PasswordField = PasswordField;
function PasswordFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), PasswordField({ required: false, ...options }));
}
exports.PasswordFieldOptional = PasswordFieldOptional;
function BooleanField(options = {}) {
    const decorators = [(0, transform_decorators_1.ToBoolean)(), (0, class_validator_1.IsBoolean)()];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)());
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null));
    }
    if (options.swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)({ type: Boolean, ...options }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.BooleanField = BooleanField;
function BooleanFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), BooleanField({ required: false, ...options }));
}
exports.BooleanFieldOptional = BooleanFieldOptional;
function TmpKeyField(options = {}) {
    const decorators = [
        StringField(options),
        (0, validator_decorators_1.IsTmpKey)({ each: options.each }),
    ];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)());
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null));
    }
    if (options.swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)({ type: String, ...options, isArray: options.each }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.TmpKeyField = TmpKeyField;
function TmpKeyFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), TmpKeyField({ required: false, ...options }));
}
exports.TmpKeyFieldOptional = TmpKeyFieldOptional;
function EnumField(getEnum, options = {}) {
    const enumValue = getEnum();
    const decorators = [(0, class_validator_1.IsEnum)(enumValue, { each: options.each })];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)());
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null));
    }
    if (options.each) {
        decorators.push((0, transform_decorators_1.ToArray)());
    }
    if (options.swagger !== false) {
        decorators.push((0, property_decorators_1.ApiEnumProperty)(getEnum, { ...options, isArray: options.each }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.EnumField = EnumField;
function ClassField(getClass, options = {}) {
    const classValue = getClass();
    const decorators = [
        (0, class_transformer_1.Type)(() => classValue),
        (0, class_validator_1.ValidateNested)({ each: options.each }),
    ];
    if (options.required !== false) {
        decorators.push((0, class_validator_1.IsDefined)());
    }
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)());
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null));
    }
    if (options.swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)({
            type: () => classValue,
            ...options,
        }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.ClassField = ClassField;
function EnumFieldOptional(getEnum, options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), EnumField(getEnum, { required: false, ...options }));
}
exports.EnumFieldOptional = EnumFieldOptional;
function ClassFieldOptional(getClass, options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), ClassField(getClass, { required: false, ...options }));
}
exports.ClassFieldOptional = ClassFieldOptional;
function EmailField(options = {}) {
    const decorators = [
        (0, class_validator_1.IsEmail)(),
        StringField({ toLowerCase: true, ...options }),
    ];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)());
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null));
    }
    if (options.swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)({ type: String, ...options }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.EmailField = EmailField;
function EmailFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), EmailField({ required: false, ...options }));
}
exports.EmailFieldOptional = EmailFieldOptional;
function PhoneField(options = {}) {
    const decorators = [(0, validator_decorators_1.IsPhoneNumber)(), (0, transform_decorators_1.PhoneNumberSerializer)()];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)());
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null));
    }
    if (options.swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)({ type: String, ...options }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.PhoneField = PhoneField;
function PhoneFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), PhoneField({ required: false, ...options }));
}
exports.PhoneFieldOptional = PhoneFieldOptional;
function UUIDField(options = {}) {
    const decorators = [(0, class_transformer_1.Type)(() => String), (0, class_validator_1.IsUUID)('4', { each: options.each })];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)());
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null));
    }
    if (options.swagger !== false) {
        decorators.push((0, property_decorators_1.ApiUUIDProperty)(options));
    }
    if (options.each) {
        decorators.push((0, transform_decorators_1.ToArray)());
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.UUIDField = UUIDField;
function UUIDFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), UUIDField({ required: false, ...options }));
}
exports.UUIDFieldOptional = UUIDFieldOptional;
function URLField(options = {}) {
    const decorators = [StringField(options), (0, class_validator_1.IsUrl)({}, { each: true })];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)({ each: options.each }));
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null, { each: options.each }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.URLField = URLField;
function URLFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), URLField({ required: false, ...options }));
}
exports.URLFieldOptional = URLFieldOptional;
function DateField(options = {}) {
    const decorators = [(0, class_transformer_1.Type)(() => Date), (0, class_validator_1.IsDate)()];
    if (options.nullable) {
        decorators.push((0, validator_decorators_1.IsNullable)());
    }
    else {
        decorators.push((0, class_validator_1.NotEquals)(null));
    }
    if (options.swagger !== false) {
        decorators.push((0, swagger_1.ApiProperty)({ type: Date, ...options }));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
exports.DateField = DateField;
function DateFieldOptional(options = {}) {
    return (0, common_1.applyDecorators)((0, validator_decorators_1.IsUndefinable)(), DateField({ ...options, required: false }));
}
exports.DateFieldOptional = DateFieldOptional;
//# sourceMappingURL=field.decorators.js.map