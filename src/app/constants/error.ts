export enum TError {
  user_is_inactive = 'Tài khoản chưa được xác thực',
  user_not_found = 'Tài khoản này chưa được đăng ký',
  too_many_request = 'Có quá nhiều yêu cầu. Vui lòng đợi một chút và thử lại sau.',
  user_is_exist = 'Người dùng đã được đăng ký, vui lòng đăng ký với email khác',
  otp_invalid_or_expired = 'Mã không hợp lệ hoặc đã quá hạn',
  user_try_login_many_times = 'Xin lỗi! Có vẻ như bạn đã cố gắng đăng nhập nhiều lần. Vui lòng thử lại sau một thời gian.',
  wrong_password = 'Sai mật khẩu, vui lòng nhập lại',
  type_invalid = 'Yêu cầu không hợp lệ!',
}

// export const ErrorTranslator: { [key in TError]: string } = {
//   user_is_inactive: "Tài khoản chưa được xác thực"
// };
