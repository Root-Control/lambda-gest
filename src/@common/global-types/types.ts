/* eslint-disable @typescript-eslint/no-explicit-any */
export type Constructor<T = any, Arguments extends unknown[] = any[]> = new (
  ...arguments_: Arguments
) => T;

export type KeyOfType<Entity, U> = {
  [P in keyof Required<Entity>]: Required<Entity>[P] extends U
    ? P
    : Required<Entity>[P] extends U[]
      ? P
      : never;
}[keyof Entity];

export type RedisUserDetails = {
  user: RedisUser;
  currentTeam: RedisTeam;
  subcompanies: RedisCompany[];
  background: RedisBackground;
};

export interface RedisUser {
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
}

export type RedisTeam = {
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
  marksettings_contract_not_restrict_mark?: boolean;
  automatic_approval_he: boolean;
  request_wd_consider_days_off: boolean;
};

export type RedisCompany = {
  id: number;
  team_id: number;
};

export type RedisBackground = {
  id: number;
  email: null | string;
  phone: string;
  extra_hours: boolean;
  init_contract: string;
  end_contract: null | string;
  indefinite_contract: boolean;
  team_id: number;
  user_id: number;
  created_at: null | string;
  updated_at: string;
  role_org_id: null | number;
  area_org_id: null | number;
  id_number: string;
  default_config: boolean;
  check_assistance: boolean;
  setup_access: boolean;
  tcbdda: boolean;
  work_sundays_holidays: boolean;
  telework: boolean;
  worker_type: string;
  init_contract_format: string;
  end_contract_format: null | string;
  id_number_format: string;
  id_number_code: string;
};

export type RedisShift = {
  [key: string]: any;
};

export type RedisLocation = {
  [key: string]: any;
};

export type RedisLocationStatus = {
  [key: string]: any;
};

export type RedisMarkType = {
  [key: string]: any;
};
