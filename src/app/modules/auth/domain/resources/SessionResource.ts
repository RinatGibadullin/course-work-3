import { BaseRestResource } from "infrastructure/BaseRestResource";
import httpResource from "app/modules/core/infrastructure/httpResource";

export class SessionResource extends BaseRestResource {}

const sessionResource = new SessionResource(httpResource, 'sessions');
export default sessionResource;
