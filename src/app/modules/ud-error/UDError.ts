import { UDErrorCode } from "./UDErrorCode";

class UDError {
  public throw(errorCode: UDErrorCode) {
    throw new Error(errorCode);
  }
}

const udError = new UDError();
export default udError;