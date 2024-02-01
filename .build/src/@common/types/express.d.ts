import { RedisBackground, RedisCompany, RedisTeam } from '@common/global-types/types';
import { Request } from 'express';
export interface CustomRequest extends Request {
    user?: User;
}
export interface User {
    id: number;
    name: string;
    lastname: string;
    id_number: string;
    currentTeam: RedisTeam;
    subcompany: RedisCompany;
    background: RedisBackground;
}
