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
            <div className="container-fluid">
                <div className="row justify-content-between">
                    {products.map(product =>
                        <li key={product.id}>
                            <ProductsListItem product={product} />
                        </li>
                    )}
                </div>
            </div>

        </ul>
    )
};

export default ProductsList;
