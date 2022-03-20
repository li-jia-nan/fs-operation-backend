'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deserializer = exports.serializer = exports.resolve = exports.join = void 0;
const path_1 = __importDefault(require('path'));
const join = p => {
  return path_1.default.join(__dirname, p);
};
exports.join = join;
const resolve = p => {
  return path_1.default.resolve(__dirname, p);
};
exports.resolve = resolve;
const serializer = value => {
  try {
    return JSON.stringify(value);
  } catch {
    if (typeof value === 'string') {
      return value;
    }
    return '';
  }
};
exports.serializer = serializer;
const deserializer = value => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
exports.deserializer = deserializer;
