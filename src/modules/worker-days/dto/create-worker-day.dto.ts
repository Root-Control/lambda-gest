import {
  NumberField,
  StringField,
} from '../../../@common/decorators/field.decorators';

export class CreateWorkerDayDto {
  @StringField()
  date: string;

  @NumberField()
  shift_id: number;

  @NumberField()
  user_id: number;

  @NumberField()
  team_id: number;

  @StringField()
  tmpKey: string;

  @StringField()
  type: string;
}
