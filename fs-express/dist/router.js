'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createRouter = exports.readRouter = void 0;
const fs_extra_1 = require('fs-extra');
const model_1 = require('./model');
const utils_1 = require('./utils');
const readRouter = req => {
  return new Promise((resolve, reject) => {
    const { path } = req.query;
    if (!path) {
      reject(new model_1.ErrorModel(null, '读取失败，请传入正确的path'));
    }
    (0, fs_extra_1.readFile)((0, utils_1.join)(path))
      .then(data => {
        resolve(new model_1.SuccessModel((0, utils_1.deserializer)(data.toString()), '读取成功'));
      })
      .catch(err => {
        reject(new model_1.ErrorModel(null, '读取失败：' + err));
      });
  });
};
exports.readRouter = readRouter;
const createRouter = req => {
  return new Promise((resolve, reject) => {
    const { path, content } = req.body;
    if (!path || !content) {
      reject(new model_1.ErrorModel(null, '写入失败，请传入正确的参数'));
    }
    (0, fs_extra_1.writeFile)((0, utils_1.join)(path), (0, utils_1.serializer)(content))
      .then(() => {
        resolve(new model_1.SuccessModel(null, '写入成功'));
      })
      .catch(err => {
        reject(new model_1.ErrorModel(null, '写入失败：' + err));
      });
  });
};
exports.createRouter = createRouter;
