import { Request } from 'express'; // Asegúrate de que sea 'express' o 'fastify'

export interface CustomRequest extends Request {
  user?: User; // Define un tipo más específico para 'user' si es necesario
}

export interface User {
  id: number;
  name: string;
  lastnames: string;
  email: string;
  phone: string | null;
  birth_date: string | null;
  id_number: string;
  email_verified_at: string | null;
  register_step: number;
  current_team_id: number;
  profile_photo_path: string | null;
  role_org_id: number | null;
  disabled: boolean;
  account_type: string;
  profile_photo_url: string;
  birth_date_format: string;
  is_logged_team_active: boolean;
  is_include_sync: boolean;
  check_assistance: boolean;
  setup_access: boolean;
  subcompanies: Subcompany[];
  background: Background[];
}

interface Team {
  id: number;
  name: string;
  personal_team: boolean;
  survey: string;
  country_id: number;
  function_id: number;
  access_notification_marks: boolean;
  access_my_hours_worked: boolean;
  access_marks_history: boolean;
  access_reports: boolean;
  access_hash_validation: boolean;
  access_day_management: boolean;
  display_format_lastname_name: boolean;
  marksettings_checkpoint_to_management_center: boolean;
  marksettings_teleworking_collaborator_alerts: boolean;
  marksettings_managers_monitoringr_alerts: boolean;
  automatic_approval_he: boolean;
  request_wd_consider_days_off: boolean;
}


interface Subcompany {
  id: number;
  name: string;
  business_name: string;
  id_number: string;
  email: string | null;
  address: string | null;
  phone: string | null;
  representative_name: string;
  representative_phone: string | null;
  representative_email: string | null;
  team_id: number;
  created_at: string;
  updated_at: string;
  type_id: number;
  representative_id_number: string;
  country_id: number;
  specialty_id: number;
  pivot: Pivot;
}

interface Background {
  id: number;
  email: string;
  phone: string | null;
  extra_hours: boolean;
  init_contract: string | null;
  end_contract: string | null;
  indefinite_contract: boolean;
  team_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  role_org_id: number | null;
  area_org_id: number | null;
  id_number: string;
  default_config: boolean;
  check_assistance: boolean;
  setup_access: boolean;
  tcbdda: boolean;
  work_sundays_holidays: boolean;
  telework: boolean;
  init_contract_format: string | null;
  end_contract_format: string | null;
  id_number_format: string;
  id_number_code: string;
}

interface Pivot {
  user_id: number;
  subcompany_id: number;
}
