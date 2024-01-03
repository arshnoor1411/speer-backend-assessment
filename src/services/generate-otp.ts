import { OTP_LENGTH } from 'src/utils/otp-config';

const otpGenerator = require('otp-generator');

export async function generateOtp() {
  const OTP = otpGenerator.generate(OTP_LENGTH, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
}
