import fs from 'fs';
import { Request } from 'express';
import { ErrorModel, SuccessModel } from './model';
import { join, serializer, deserializer } from './utils';

export const readRouter = (req: Request): Promise<SuccessModel> => {
  return new Promise<SuccessModel>((resolve, reject) => {
    const { path } = req.query;
    if (!path) {
      reject(new ErrorModel(null, '读取失败，请传入正确的path'));
    }
    fs.readFile(join(path as string), (err, data) => {
      if (err) {
        reject(new ErrorModel(null, '读取失败：' + err));
      }
      resolve(new SuccessModel(deserializer(data.toString()), '读取成功'));
    });
  });
};

export const createRouter = (req: Request): Promise<SuccessModel> => {
  return new Promise<SuccessModel>((resolve, reject) => {
    const { path, content } = req.body;
    if (!path || !content) {
      reject(new ErrorModel(null, '写入失败，请传入正确的参数'));
    }
    fs.writeFile(join(path), serializer(content), err => {
      if (err) {
        reject(new ErrorModel(null, '写入失败：' + err));
      }
      resolve(new SuccessModel(null, '写入成功'));
    });
  });
};
