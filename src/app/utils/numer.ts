import numeral from 'numeral';
import 'numeral/locales/es';
import 'numeral/locales/vi';

export const numer = numeral;

export const numerConfig = () => {
  numer.locale('es');
  // numer.localeData('vi').delimiters = {
  //   thousands: '.',
  //   decimal: ',',
  // };
  // numer.localeData('vi').abbreviations = {
  //   thousand: 'k',
  //   million: 'tr',
  //   billion: 'tỉ',
  //   trillion: 'nghìn tỉ',
  // };
  // numer.localeData('vi').currency = {
  //   symbol: '₫',
  // };
  // numer.localeData('en').currency = {
  //   symbol: '₫',
  // };
};

export function toShortNumber(value: string | number) {
  return numer(value).format('0,[00]a');
}

export function toCurrency(value: string | number) {
  return numer(value).format('0,[00] $');
}

export function toShortCurrency(value: string | number) {
  return numer(value).format('0,[00]a $');
}
