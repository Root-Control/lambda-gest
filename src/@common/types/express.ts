import {
  RedisBackground,
  RedisCompany,
  RedisTeam,
} from '@common/global-types/types';
import { Request } from 'express'; // Asegúrate de que sea 'express' o 'fastify'

export interface CustomRequest extends Request {
  user?: User; // Define un tipo más específico para 'user' si es necesario
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
