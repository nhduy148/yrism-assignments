import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { DATE_TIME_FORMAT } from 'app/constants';
import { isNil } from 'lodash-es';

export const datetime = dayjs;

export const toTimeZone = (_datetime: any, fallback = new Date()) => {
  const validDatetime = !isNil(_datetime) && datetime(_datetime).isValid();
  const validFallback = !isNil(fallback) && datetime(fallback).isValid();
  return datetime(validDatetime ? _datetime : datetime(validFallback ? fallback : new Date())).tz();
};

export const formatDateTime = (_datetime: any) => {
  if (!datetime(_datetime).isValid()) {
    return '';
  }
  return datetime(_datetime).format(DATE_TIME_FORMAT);
};

export const datetimeConfig = () => {
  dayjs.locale('en');
  dayjs.extend(utc);
  dayjs.extend(duration);
  dayjs.extend(timezone);
  dayjs.extend(isBetween);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(customParseFormat);
};
