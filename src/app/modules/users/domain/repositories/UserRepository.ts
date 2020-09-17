import { BaseRepository } from "infrastructure/BaseRepository";
import userResource from "../resources/UserResource";
import User from "../interfaces/User";

export class UserRepository extends BaseRepository<User> {
  protected requestEntityWrap = (user: User) => ({ user });
}

const userRepository = new UserRepository(userResource);
export default userRepository;