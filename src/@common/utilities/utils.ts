import * as moment from 'moment';

export function getVariableName<TResult>(
  getVar: () => TResult,
): string | undefined {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replaceAll(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts.at(-1);
}

export function getString(key: string): string {
  return key.replaceAll('\\n', '\n');
}

export function isJsonString(string: string) {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
}

export function diffInMinutes(time1: string, time2: string) {
  const formattedTime1 = moment(time1, 'HH:mm:ss');
  const formattedTime2 = moment(time2, 'HH:mm:ss');
  return Math.abs(formattedTime1.diff(formattedTime2, 'minutes'));
}
