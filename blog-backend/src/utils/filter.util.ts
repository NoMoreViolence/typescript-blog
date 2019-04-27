export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const exportObjectKeys = <T extends object, K extends Array<keyof T>>(
  obj: T,
  ...keys: K
): Omit<T, K[number]> => {
  keys.map(k => delete obj[k]);
  return obj;
};
