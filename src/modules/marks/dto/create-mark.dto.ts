import {
  BooleanField,
  NumberField,
  NumberFieldOptional,
  StringField,
} from '../../../@common/decorators/field.decorators';

export class CreateMarkDto {
  @StringField()
  time: string;

  @BooleanField()
  isValid: boolean;

  @StringField({ each: true })
  errors: string[];

  @StringField()
  device_time: string;

  @StringField()
  service_time: string;

  @BooleanField()
  user_service: boolean;

  @BooleanField()
  time_service_alert: boolean;

  @StringField()
  latitude: string;

  @StringField()
  longitude: string;

  @NumberField()
  mark_type_id: number;

  @NumberField()
  location_id: number;

  @NumberField()
  location_status_id: number;

  @NumberField()
  date: string;

  @NumberFieldOptional()
  management_center_id?: number;
}
