export class ResponseModel<T> {
  data?: T;
  success?: boolean;
  message?: string;

  setSuccessResponse(message: string, success: boolean): void {
    this.success = success;
    this.message = message;
  }

  setSuccessResponseAndDataWithMessage(
    data: T,
    message: string,
    success: boolean,
  ): void {
    this.data = data;
    this.message = message;
    this.success = success;
  }

  setSuccessResponseAndData(data: T, success: boolean): void {
    this.data = data;
    this.success = success;
  }
}
