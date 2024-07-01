export const DEFAULT_FONT_SIZE = 14;
export const DEFAULT_HTML_FONTSIZE = 16;
export const COEF: number = DEFAULT_FONT_SIZE / 14;

export function pxToRem(size: number) {
  return `${(size / DEFAULT_HTML_FONTSIZE) * COEF}rem`;
}

export const DEFAULT_FONT_NAME = 'Roboto';
export const FONT_FAMILIES: string[] = [DEFAULT_FONT_NAME, 'sans-serif'];

export const DESKTOP_FONTSIZE = {
  h1: 64,
  h2: 56,
  h3: 48,
  h4: 32,
  h5: 24,
  h6: 16,
  button: 16,
  buttonSm: 14,
  title: 20,
  titleMobile: 16,
  subtitle1: 16,
  subtitle2: 14,
  body1: 16,
  body2: 14,
  caption: 13,
  overline: 12,
};

export const BREAK_POINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const FONT_WEIGHT_LIGHT = 300;
export const FONT_WEIGHT_REGULAR = 400;
export const FONT_WEIGHT_MEDIUM = 500;
export const FONT_WEIGHT_BOLD = 700;

export const DARK_PRIMARY_COLOR = '#FFC100';
export const DARK_PRIMARY_COLOR_LIGHTEN = '#ffc825';
export const DARK_PRIMARY_COLOR_DARKEN = '#ffb100';
export const DARK_SECONDARY_COLOR = '#0B74E5';

export const LIGHT_PRIMARY_COLOR = '#FFC100';
export const LIGHT_PRIMARY_COLOR_LIGHTEN = '#ffc825';
export const LIGHT_PRIMARY_COLOR_DARKEN = '#ffb100';
export const LIGHT_SECONDARY_COLOR = '#0B74E5';

export const LIGHT_ACTIVE_COLOR = '#424242';
export const PRIMARY_TEXT_COLOR = '#27272A';
export const SECONDARY_TEXT_COLOR = '#7D7D7D';
export const DISABLED_TEXT_COLOR = 'rgba(0, 0, 0, 0.38)';

export const DEFAULT_PRODUCT_PER_PAGE_DESKTOP = 20;
export const DEFAULT_PRODUCT_PER_PAGE_TABLET = 20;
export const DEFAULT_PRODUCT_PER_PAGE_MOBILE = 10;

export const USER_ORDER_DAY_FORMAT = 'DD/MM YYYY';
export const CURRENCY = 'VND';

export const USER_ACCOUNT_PAGE_SIZE = 4;

export const IMAGE_MAX_SIZE = 5000000; // Bytes
export const REVIEW_IMAGES_TOTAL_SIZE = 10000000; // Bytes
