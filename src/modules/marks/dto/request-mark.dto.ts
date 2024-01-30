import { Statuslocations } from '@common/types/enums';
import {
  DateField,
  EnumField,
  NumberField,
  StringField,
  StringFieldOptional,
} from '../../../@common/decorators/field.decorators';

export class RequestMarkDto {
  @NumberField()
  timeOffline: number;

  @DateField()
  date: Date;

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

  @DateField()
  realDate: string;

  @StringFieldOptional({ nullable: true })
  latitude: string;

  @StringFieldOptional({ nullable: true })
  longitude: string;

  @StringFieldOptional({ nullable: true, minLength: 0 })
  photo: string;
}
