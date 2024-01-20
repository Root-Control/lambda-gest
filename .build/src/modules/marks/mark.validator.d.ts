import { User } from '@common/types/express';
export declare class MarkValidator {
    errors: string[];
    constructor();
    isValidUser(user: User): this;
    isValidContract(user: User): this;
    workerDayexists(): this;
    verifyUserShift(): this;
    haveJustifiedAssistance(): this;
}
