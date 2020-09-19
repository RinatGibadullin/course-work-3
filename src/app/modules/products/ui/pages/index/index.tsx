import React from "react";
import ProductsList from "../../components/products-list";
import products from "./products.json"

const Products = () => {
    return (
        <div>
            <ProductsList products={products}/>
        </div>
    )
};

export default Products;
