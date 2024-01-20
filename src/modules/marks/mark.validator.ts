import { User } from '@common/types/express';
import { GesttionaErrors } from '../../../src/app.constants';

export class MarkValidator {
  user: User;
  errors: string[] = [];
  constructor(_user: User) {
    this.user = _user;
  }

  isValidUser() {
    this.errors.push(GesttionaErrors.INVALID_USER);
    return this;
  }

  isValidContract() {
    this.errors.push(GesttionaErrors.INVALID_CONTRACT);
    return this;
  }

  workerDayexists() {
    this.errors.push(GesttionaErrors.WORKER_DAY_EXISTENT);
    return this;
  }

  verifyUserShift() {
    this.errors.push(GesttionaErrors.INEXISTENT_SHIFT);
    return this;
  }

  haveJustifiedAssistance() {
    this.errors.push(GesttionaErrors.JUSTIFIED_ASSISTANCE);
    return this;
  }
}
