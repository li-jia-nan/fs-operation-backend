class BaseModel {
  data: any = null;
  message: string = '';
  constructor(data: any, message: string) {
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

export class SuccessModel extends BaseModel {
  success: boolean = true;
  constructor(data: any, message: string) {
    super(data, message);
    this.success = true;
  }
}

export class ErrorModel extends BaseModel {
  success: boolean = false;
  constructor(data: any, message: string) {
    super(data, message);
    this.success = false;
  }
}
