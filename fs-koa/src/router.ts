import { Context } from 'koa';
import { readFile, writeFile } from 'fs-extra';
import { ErrorModel, SuccessModel } from './model';
import { join, serializer, deserializer } from './utils';

export const readRouter = (ctx: Context): Promise<SuccessModel> => {
  return new Promise<SuccessModel>((resolve, reject) => {
    const { path } = ctx.query;
    if (!path) {
      reject(new ErrorModel(null, '读取失败，请传入正确的path'));
    }
    readFile(join(path as string))
      .then(data => {
        resolve(new SuccessModel(deserializer(data.toString()), '读取成功'));
      })
      .catch(err => {
        reject(new ErrorModel(null, '读取失败：' + err));
      });
  });
};

export const createRouter = (ctx: Context): Promise<SuccessModel> => {
  return new Promise<SuccessModel>((resolve, reject) => {
    const { path, content } = ctx.request.body;
    if (!path || !content) {
      reject(new ErrorModel(null, '写入失败，请传入正确的参数'));
    }
    writeFile(join(path), serializer(content))
      .then(() => {
        resolve(new SuccessModel(null, '写入成功'));
      })
      .catch(err => {
        reject(new ErrorModel(null, '写入失败：' + err));
      });
  });
};
