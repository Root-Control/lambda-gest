import { User } from '@common/types/express';
import { RedisBackground, RedisTeam } from '@common/global-types/types';
import * as moment from 'moment';
export declare class MarkValidator {
    readonly user: User;
    readonly team: RedisTeam;
    readonly background: RedisBackground;
    readonly date: moment.Moment;
    errors: string[];
    constructor(_user: User, _date: Date);
    isValidUser(): this;
    isValidContract(): this;
    workerDayexists(exists: boolean): this;
    verifyUserShift(): this;
    haveJustifiedAssistance(isWorkerDayJustified: boolean): this;
    private shouldWorkAccordingToContract;
}
