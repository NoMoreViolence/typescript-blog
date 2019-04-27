import { User } from 'database/models';
import { Repository } from 'typeorm';

export const getUserByEmail = (
  trans: { entity: Repository<User>; email: string },
  option: { select?: Array<keyof User> } = {}
) => trans.entity.findOne({ where: { email: trans.email }, ...option });

export const getUserByUserId = (
  trans: { entity: Repository<User>; userId: string },
  option: { select?: Array<keyof User> } = {}
) => trans.entity.findOne({ where: { id: trans.userId }, ...option });

export const createUser = (trans: {
  entity: Repository<User>;
  email: string;
  password: string;
  saltKey: string;
  name: string;
}) => {
  const user = new User();
  user.email = trans.email;
  user.password = trans.password;
  user.salt = trans.saltKey;
  user.name = trans.name;
  return trans.entity.save(user);
};
