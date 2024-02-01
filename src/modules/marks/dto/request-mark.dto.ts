import { Statuslocations } from '../../../@common/types/enums';
import {
  DateFieldOptional,
  EnumField,
  NumberField,
  NumberFieldOptional,
  StringField,
  StringFieldOptional,
} from '../../../@common/decorators/field.decorators';

export class RequestMarkDto {
  @NumberField()
  timeOffline: number;

  @StringField()
  date: string;

  @StringField()
  time: string;

  @StringField()
  mark_type: string;

  @StringFieldOptional()
  shift?: string;

  @StringField()
  img: string;

  @NumberField()
  location: number;

  @EnumField(() => Statuslocations)
  status_location: Statuslocations;

  @DateFieldOptional()
  realDate?: string;

  @StringFieldOptional({ nullable: true })
  latitude: string;

  @StringFieldOptional({ nullable: true })
  longitude: string;

  @StringFieldOptional({ nullable: true })
  source?: string;

  @NumberFieldOptional({ nullable: true })
  management_center_id?: number;

  @StringFieldOptional({ nullable: true, minLength: 0 })
  photo: string;
}
