import { checkEmail, checkPassword } from '@util';

export const checkRegisterVaildation = ({
  email,
  password,
  rPassword
}: {
  email: string;
  password: string;
  rPassword: string;
}): void => {
  checkPassword(password, rPassword);
  checkEmail(email);
};
