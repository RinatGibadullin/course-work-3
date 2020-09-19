import { Product } from "app/modules/products/domain/interfaces/Product";
import React from "react";
import ProductsListItem from "../products-list-item";

type Props = {
    products: Product[]
}

const ProductsList = (props: Props) => {
    const { products } = props
    return (
        <ul>
            {products.map(product =>
                <li key={product.id}>
                    <ProductsListItem product={product} />
                </li>
            )}
        </ul>
    )
};

export default ProductsList;
