import {
  DateField,
  NumberField,
  StringField,
  StringFieldOptional,
} from '../../../@common/decorators/field.decorators';

export class CreateMarkDto {
  @NumberField()
  timeOffline: number;

  @DateField()
  date: Date;

  @StringField()
  time: string;

  @StringField()
  mark_type: string;

  @StringField()
  img: string;

  @NumberField()
  location: number;

  @StringField()
  status_location: string;

  @DateField()
  realDate: string;

  @StringFieldOptional({ nullable: true })
  latitude: string;

  @StringFieldOptional({ nullable: true })
  longitude: string;

  @StringFieldOptional({ nullable: true, minLength: 0 })
  photo: string;
}
