import { User } from '../../@common/types/express';
import { GesttionaErrors } from '../../app.constants';
import { RedisBackground, RedisTeam } from '@common/global-types/types';
import * as moment from 'moment';
import { CreateWorkerDayDto } from '../worker-days/dto/create-worker-day.dto';

export class MarkValidator {
  readonly user: User;
  readonly team: RedisTeam;
  readonly background: RedisBackground;
  readonly date: moment.Moment;
  outOfContract: boolean = false;

  errors: string[] = [];
  constructor(_user: User, _date: string) {
    this.date = moment(_date);
    this.user = _user;
    this.team = _user.currentTeam;
    this.background = _user.background;
  }

  isValidUser() {
    const { currentTeam, subcompany, background } = this.user;
    if (
      currentTeam.id !== subcompany.team_id ||
      currentTeam.id !== background.team_id
    ) {
      this.errors.push(GesttionaErrors.INVALID_USER);
    }
    return this;
  }

  isValidContract() {
    const shouldWork = this.shouldWorkAccordingToContract();

    if (!shouldWork) {
      if (!this.team.marksettings_contract_not_restrict_mark) {
        this.errors.push(GesttionaErrors.INVALID_CONTRACT);
      } else {
        this.outOfContract = true;
      }
    }
    return this;
  }

  workerDayexists(workerDay: CreateWorkerDayDto, type: string) {
    if (workerDay && workerDay.type === type) {
      this.errors.push(GesttionaErrors.WORKER_DAY_EXISTENT);
    }
    return this;
  }

  /**
   *
   * @returns TODO VALIDATE FROM CACHE
   */
  verifyUserShift(shift: number) {
    if (!shift) {
      this.errors.push(GesttionaErrors.INEXISTENT_SHIFT);
    }
    return this;
  }

  haveJustifiedAssistance(isWorkerDayJustified: boolean) {
    if (isWorkerDayJustified) {
      this.errors.push(GesttionaErrors.JUSTIFIED_ASSISTANCE);
    }
    return this;
  }

  private shouldWorkAccordingToContract(): boolean {
    const { init_contract, end_contract, indefinite_contract } =
      this.background;

    if (init_contract) {
      const contractStartdate = moment(init_contract);

      if (indefinite_contract) {
        if (this.date.isSameOrAfter(contractStartdate)) {
          return true;
        }
      } else {
        if (end_contract) {
          const contractEndDate = moment(end_contract);

          if (
            this.date.isSameOrAfter(contractStartdate) &&
            this.date.isSameOrBefore(contractEndDate)
          ) {
            return true;
          }
        } else {
          return true;
        }
      }
    }
    return true;
  }
}
