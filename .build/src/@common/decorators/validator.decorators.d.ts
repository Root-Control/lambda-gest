import { IsPhoneNumber as isPhoneNumber, type ValidationOptions } from 'class-validator';
export declare function IsPassword(validationOptions?: ValidationOptions): PropertyDecorator;
export declare function IsPhoneNumber(validationOptions?: ValidationOptions & {
    region?: Parameters<typeof isPhoneNumber>[0];
}): PropertyDecorator;
export declare function IsTmpKey(validationOptions?: ValidationOptions): PropertyDecorator;
export declare function IsUndefinable(options?: ValidationOptions): PropertyDecorator;
export declare function IsNullable(options?: ValidationOptions): PropertyDecorator;
