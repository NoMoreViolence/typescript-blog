import { checkEmail, checkPassword, checkSameValue } from '@util';

export const checkRegisterVaildation = ({
  email,
  password,
  rPassword
}: {
  email: string;
  password: string;
  rPassword: string;
}): void => {
  checkEmail(email);
  checkPassword(password);
  checkSameValue(password, rPassword);
};

export const checkLoginVaildation = ({ email, password }: { email: string; password: string }): void => {
  checkEmail(email);
  checkPassword(password);
};
