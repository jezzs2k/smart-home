import * as dateFns from 'date-fns';
import {vi} from 'date-fns/locale';

export function formatDateToString(
  date?: Date | string,
  formatOutput = 'EEEEEE dd MMM yyyy',
) {
  if (date == null) {
    return '';
  }

  if (typeof date === 'string') {
    const dateFormat = new Date(date);

    return dateFns.format(dateFormat, formatOutput, {locale: vi});
  } else {
    return dateFns.format(date, formatOutput, {locale: vi});
  }
}

export function formatTimeToString(date?: Date | string, formatOutput = 'p') {
  if (date == null) {
    return '';
  }

  if (typeof date === 'string') {
    const dateFormat = new Date(date);

    return dateFns.format(dateFormat, formatOutput, {locale: vi});
  } else {
    return dateFns.format(date, formatOutput, {locale: vi});
  }
}
