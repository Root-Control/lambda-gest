import { type ApiPropertyOptions } from '@nestjs/swagger';
import { Constructor } from 'src/types';
interface IFieldOptions {
    each?: boolean;
    swagger?: boolean;
    nullable?: boolean;
    groups?: string[];
}
interface INumberFieldOptions extends IFieldOptions {
    min?: number;
    max?: number;
    int?: boolean;
    isPositive?: boolean;
}
interface IStringFieldOptions extends IFieldOptions {
    minLength?: number;
    maxLength?: number;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
}
type IClassFieldOptions = IFieldOptions;
type IBooleanFieldOptions = IFieldOptions;
type IEnumFieldOptions = IFieldOptions;
export declare function NumberField(options?: Omit<ApiPropertyOptions, 'type'> & INumberFieldOptions): PropertyDecorator;
export declare function NumberFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required'> & INumberFieldOptions): PropertyDecorator;
export declare function CurrencyField(options?: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions): PropertyDecorator;
export declare function StringField(options?: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions): PropertyDecorator;
export declare function StringFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required'> & IStringFieldOptions): PropertyDecorator;
export declare function PasswordField(options?: Omit<ApiPropertyOptions, 'type' | 'minLength'> & IStringFieldOptions): PropertyDecorator;
export declare function PasswordFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required' | 'minLength'> & IStringFieldOptions): PropertyDecorator;
export declare function BooleanField(options?: Omit<ApiPropertyOptions, 'type'> & IBooleanFieldOptions): PropertyDecorator;
export declare function BooleanFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required'> & IBooleanFieldOptions): PropertyDecorator;
export declare function TmpKeyField(options?: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions): PropertyDecorator;
export declare function TmpKeyFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required'> & IStringFieldOptions): PropertyDecorator;
export declare function EnumField<TEnum extends object>(getEnum: () => TEnum, options?: Omit<ApiPropertyOptions, 'type' | 'enum' | 'enumName' | 'isArray'> & IEnumFieldOptions): PropertyDecorator;
export declare function ClassField<TClass extends Constructor>(getClass: () => TClass, options?: Omit<ApiPropertyOptions, 'type'> & IClassFieldOptions): PropertyDecorator;
export declare function EnumFieldOptional<TEnum extends object>(getEnum: () => TEnum, options?: Omit<ApiPropertyOptions, 'type' | 'required' | 'enum' | 'enumName'> & IEnumFieldOptions): PropertyDecorator;
export declare function ClassFieldOptional<TClass extends Constructor>(getClass: () => TClass, options?: Omit<ApiPropertyOptions, 'type' | 'required'> & IClassFieldOptions): PropertyDecorator;
export declare function EmailField(options?: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions): PropertyDecorator;
export declare function EmailFieldOptional(options?: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions): PropertyDecorator;
export declare function PhoneField(options?: Omit<ApiPropertyOptions, 'type'> & IFieldOptions): PropertyDecorator;
export declare function PhoneFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required'> & IFieldOptions): PropertyDecorator;
export declare function UUIDField(options?: Omit<ApiPropertyOptions, 'type' | 'format' | 'isArray'> & IFieldOptions): PropertyDecorator;
export declare function UUIDFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required' | 'isArray'> & IFieldOptions): PropertyDecorator;
export declare function URLField(options?: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions): PropertyDecorator;
export declare function URLFieldOptional(options?: Omit<ApiPropertyOptions, 'type'> & IStringFieldOptions): PropertyDecorator;
export declare function DateField(options?: Omit<ApiPropertyOptions, 'type'> & IFieldOptions): PropertyDecorator;
export declare function DateFieldOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required'> & IFieldOptions): PropertyDecorator;
export {};
