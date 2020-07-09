import * as moment from 'moment';

export function currentTimeUtc(format?: string): string {
  const currentMoment = moment.utc();
  return currentMoment.format(format);
}