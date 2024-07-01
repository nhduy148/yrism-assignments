import { template } from 'lodash-es';

export const DEFAULT_REQUIRED_MESSAGE = 'Vui lòng không bỏ trống ô này';
export const REQUIRED_DISHES = 'Vui lòng chọn món ăn';
export const REQUIRED_BRAND_LOGO = 'Không được bỏ trống logo';
export const MIN_PRICE_IS = template('Giá tối thiểu là <%= min %>');
export const MIN_PERMISSIONS = template('Chọn tối thiểu <%= min %> phân quyền');
export const DEFAULT_ARRAY_MIN = template('Chọn tối thiểu <%= min %> <%= kind %>');
export const INVALID_EMAIL = 'Định dạng email không hợp lệ';

export const WRONG_PHONE_NUMBER = 'Sai định dạng số điện thoại';
export const WRONG_EMAIL = 'Sai định dạng email';
export const REQUIRED_PHONE_NUMBER = 'Vui lòng điền số điện thoại';

export const MIN_PASSWORD_LENGTH = template('Độ dài mật khẩu ít nhất <%= min %> ký tự');
export const PASSWORD_IS_NOT_MATCHED = 'Mật khẩu không khớp';
