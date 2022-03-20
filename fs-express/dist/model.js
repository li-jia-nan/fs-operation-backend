'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ErrorModel = exports.SuccessModel = void 0;
class BaseModel {
  data = null;
  message = '';
  constructor(data, message) {
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}
class SuccessModel extends BaseModel {
  success = true;
  constructor(data, message) {
    super(data, message);
    this.success = true;
  }
}
exports.SuccessModel = SuccessModel;
class ErrorModel extends BaseModel {
  success = false;
  constructor(data, message) {
    super(data, message);
    this.success = false;
  }
}
exports.ErrorModel = ErrorModel;
