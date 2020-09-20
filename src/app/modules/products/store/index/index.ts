import { createIndexStore } from "app/modules/store-factories/index/create-store";
import { RootState } from "store";
import { productsEntitiesStore } from "../entities";
import { Product } from "../../domain/interfaces/Product";
import productRepository from "../../domain/repositories/ProductRepository";

const store: any = createIndexStore<Product, RootState>('products/index', {
  stateSelector: (state) => state.products.index,
  entitiesStore: productsEntitiesStore,
  repository: productRepository,
  defaultLoadParams: { pageNumber: 1, pageSize: 10 }
});

const reducer = store.reducer;

export const productsIndexStore = store;
export default reducer;