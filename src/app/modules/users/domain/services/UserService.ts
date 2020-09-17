import httpResource from "app/modules/core/infrastructure/httpResource";
import { BaseResource } from "infrastructure/interfaces/BaseResource";
import userRepository, { UserRepository } from "app/modules/users/domain/repositories/UserRepository";
import { UDErrorCode } from "app/modules/ud-error/UDErrorCode";
import udError from "app/modules/ud-error/UDError";
import User from "app/modules/users/domain/interfaces/User";
import userResource, { UserResource } from "../../domain/resources/UserResource";

class UserService {

  constructor(private httpResource: BaseResource,
    private userRepository: UserRepository,
    private userResource: UserResource) {
  }

}

const authService = new UserService(httpResource, userRepository, userResource);
export default authService;