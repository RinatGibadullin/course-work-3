import { createEntitiesStore } from "app/modules/store-factories/entities/create-store";
import { Product } from "../../domain/interfaces/Product";

const store = createEntitiesStore<Product>('products/entities', {
  stateSelector: (state) => state.products.entities
});


const reducer = store.reducer;

export const productsEntitiesStore = store;
export default reducer;
