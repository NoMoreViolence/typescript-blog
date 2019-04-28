import { User } from 'database/models';
import { Any, FindOneOptions, IsNull, Not, Repository } from 'typeorm';

export const getUserByEmail = (
  trans: { entity: Repository<User>; email: string },
  option: FindOneOptions<User> = {},
  all?: boolean
) =>
  trans.entity.findOne({
    where: {
      deletedAt: all ? Any([Not(IsNull()), IsNull()]) : IsNull(),
      email: trans.email
    },
    ...option
  });

export const getUserByUserId = (
  trans: { entity: Repository<User>; userId: string },
  option: FindOneOptions<User> = {},
  all?: boolean
) =>
  trans.entity.findOne({
    where: {
      deletedAt: all ? Any([Not(IsNull()), IsNull()]) : IsNull(),
      id: trans.userId
    },
    ...option
  });

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
