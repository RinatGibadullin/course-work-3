import { UserActions } from "../enums/UserActions";
import User from "app/modules/users/domain/interfaces/User";

class UserPermissions {
  public userCan(currentUser: User, action: UserActions, payload: any): boolean {
    return true;
  }
}

const userPermissions = new UserPermissions();
export default userPermissions;