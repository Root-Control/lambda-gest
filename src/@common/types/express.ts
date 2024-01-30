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
  lastnames: string;
  email: string;
  phone: string;
  birth_date: string;
  id_number: string;
  email_verified_at: null | string;
  register_step: number;
  current_team_id: number;
  profile_photo_path: null | string;
  role_org_id: null | number;
  disabled: boolean;
  account_type: string;
  profile_photo_url: string;
  birth_date_format: string;
  is_logged_team_active: boolean;
  is_include_sync: boolean;
  check_assistance: boolean;
  setup_access: boolean;
  currentTeam: RedisTeam;
  subcompanies: RedisCompany[];
  background: RedisBackground;
}
