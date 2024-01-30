import { User } from '@common/types/express';
import { RedisBackground, RedisTeam } from '@common/global-types/types';
import * as moment from 'moment';
import { CreateWorkerDayDto } from '../worker-days/dto/create-worker-day.dto';
export declare class MarkValidator {
    readonly user: User;
    readonly team: RedisTeam;
    readonly background: RedisBackground;
    readonly date: moment.Moment;
    outOfContract: boolean;
    errors: string[];
    constructor(_user: User, _date: string);
    isValidUser(): this;
    isValidContract(): this;
    workerDayexists(workerDay: CreateWorkerDayDto, type: string): this;
    verifyUserShift(shift: number): this;
    haveJustifiedAssistance(isWorkerDayJustified: boolean): this;
    private shouldWorkAccordingToContract;
}
