import { User } from '@common/types/express';
import { GesttionaErrors } from '../../app.constants';
import {
  RedisBackground,
  RedisShift,
  RedisTeam,
} from '@common/global-types/types';
import * as moment from 'moment';

export class MarkValidator {
  readonly user: User;
  readonly team: RedisTeam;
  readonly background: RedisBackground;
  readonly date: moment.Moment;

  errors: string[] = [];
  constructor(_user: User, _date: Date) {
    this.date = moment(_date);
    this.user = _user;
    this.team = _user.currentTeam;
    this.background = _user.background;
  }

  isValidUser() {
    const { currentTeam, subcompanies, background } = this.user;
    const [company] = subcompanies;
    if (
      currentTeam.id !== company.team_id ||
      currentTeam.id !== background.team_id
    ) {
      this.errors.push(GesttionaErrors.INVALID_USER);
    }
    return this;
  }

  isValidContract() {
    const shouldWork = this.shouldWorkAccordingToContract();

    if (!shouldWork) {
      if (this.team.marksettings_contract_not_restrict_mark) {
        this.errors.push(GesttionaErrors.INVALID_CONTRACT);
      }
    }
    return this;
  }

  workerDayexists(exists: boolean) {
    if (exists) {
      this.errors.push(GesttionaErrors.WORKER_DAY_EXISTENT);
    }
    return this;
  }

  /**
   *
   * @returns TODO VALIDATE FROM CACHE
   */
  verifyUserShift(shift: RedisShift) {
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
