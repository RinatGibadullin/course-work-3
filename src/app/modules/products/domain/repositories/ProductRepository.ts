import productResource from "../resources/ProductResource";
import { BaseRepository } from "infrastructure/BaseRepository";
import { Product } from "../interfaces/Product";

class ProductRepository extends BaseRepository<Product> {
  protected requestEntityWrap = (product: Product) => ({ product });
}

const productRepository = new ProductRepository(productResource);
export default productRepository;
