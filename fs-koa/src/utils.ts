import path from 'path';

export const join = (p: string): string => {
  return path.join(__dirname, p);
};

export const resolve = (p: string): string => {
  return path.resolve(__dirname, p);
};

export const serializer = <T = any>(value: T): string => {
  try {
    return JSON.stringify(value);
  } catch {
    if (typeof value === 'string') {
      return value;
    }
    return '';
  }
};

export const deserializer = <T>(value: string): T | string => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
