export function validatePhoneNumber(phoneNumber) {
  // 使用正则表达式匹配手机号码格式
  var pattern = /^1[3456789]\d{9}$/;
  return pattern.test(phoneNumber);
}

export function validateEmail(email) {
  // 使用正则表达式匹配电子邮件地址格式
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}