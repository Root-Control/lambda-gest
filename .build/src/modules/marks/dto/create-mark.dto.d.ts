import { Statuslocations } from '@common/types/enums';
export declare class CreateMarkDto {
    timeOffline: number;
    date: Date;
    time: string;
    mark_type: string;
    shift?: string;
    img: string;
    location: number;
    status_location: Statuslocations;
    realDate: string;
    latitude: string;
    longitude: string;
    photo: string;
    markTypeId: number;
    locationId: number;
}
