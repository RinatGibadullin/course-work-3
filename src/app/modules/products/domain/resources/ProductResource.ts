import { BaseRestResource } from "infrastructure/BaseRestResource";
import httpResource from "app/modules/core/infrastructure/httpResource";

const productResource = new BaseRestResource(httpResource, 'products');
export default productResource;
