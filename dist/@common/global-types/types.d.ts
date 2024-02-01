export type Constructor<T = any, Arguments extends unknown[] = any[]> = new (...arguments_: Arguments) => T;
export type KeyOfType<Entity, U> = {
    [P in keyof Required<Entity>]: Required<Entity>[P] extends U ? P : Required<Entity>[P] extends U[] ? P : never;
}[keyof Entity];
export type RedisUserDetails = {
    id: number;
    name: string;
    lastname: string;
    id_number: string;
    currentTeam: RedisTeam;
    subcompany: RedisCompany;
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
    marksettings_contract_not_restrict_mark: boolean;
    country: {
        id: number;
        name: string;
        location_name: string;
    };
};
export type RedisCompany = {
    id: number;
    team_id: number;
    name: string;
    business_name: string;
    address: string;
};
export type RedisBackground = {
    id: number;
    name: string;
    team_id: number;
    end_contract: string;
    indefinite_contract: string;
    init_contract: string;
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
