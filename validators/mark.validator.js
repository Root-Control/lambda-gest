
const moment = require('moment');

class MarkValidator {
    user;
    team;
    background;
    date;
    outOfContract = false;
  
    errors = [];
    constructor(_user, _date) {
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
        this.errors.push('Usuario Inválido');
      }
      return this;
    }
  
    isValidContract() {
      const shouldWork = this.shouldWorkAccordingToContract();
  
      if (!shouldWork) {
        if (!this.team.marksettings_contract_not_restrict_mark) {
          this.errors.push('Usuario fuera de contrato');
        } else {
          this.outOfContract = true;
        }
      }
      return this;
    }
  
    workerDayexists(workerDay, type) {
      if (workerDay && workerDay.type === type) {
        this.errors.push('Usuario ya marcó y su worker day existe');
      }
      return this;
    }
  
    /**
     *
     * @returns TODO VALIDATE FROM CACHE
     */
    verifyUserShift(shift) {
      if (!shift) {
        this.errors.push('Turno no existe');
      }
      return this;
    }
  
    haveJustifiedAssistance(isWorkerDayJustified) {
      if (isWorkerDayJustified) {
        this.errors.push('Posee ausencia justificada');
      }
      return this;
    }
  
    shouldWorkAccordingToContract() {
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

module.exports = {
  MarkValidator
}