import { type ApiPropertyOptions } from '@nestjs/swagger';
export declare function ApiBooleanProperty(options?: Omit<ApiPropertyOptions, 'type'>): PropertyDecorator;
export declare function ApiBooleanPropertyOptional(options?: Omit<ApiPropertyOptions, 'type' | 'required'>): PropertyDecorator;
export declare function ApiUUIDProperty(options?: Omit<ApiPropertyOptions, 'type' | 'format'> & Partial<{
    each: boolean;
}>): PropertyDecorator;
export declare function ApiUUIDPropertyOptional(options?: Omit<ApiPropertyOptions, 'type' | 'format' | 'required'> & Partial<{
    each: boolean;
}>): PropertyDecorator;
export declare function ApiEnumProperty<TEnum>(getEnum: () => TEnum, options?: Omit<ApiPropertyOptions, 'type'> & {
    each?: boolean;
}): PropertyDecorator;
export declare function ApiEnumPropertyOptional<TEnum>(getEnum: () => TEnum, options?: Omit<ApiPropertyOptions, 'type' | 'required'> & {
    each?: boolean;
}): PropertyDecorator;
