import { BaseRestResource } from "infrastructure/BaseRestResource";
import httpResource from "app/modules/core/infrastructure/httpResource";

export class UserResource extends BaseRestResource {}

const userResource = new UserResource(httpResource, 'users');
export default userResource;