import { usePagination } from "app/modules/pagination/ui/use-pagination";
import { Product } from "app/modules/products/domain/interfaces/Product";
import { productsIndexStore } from "app/modules/products/store/index";
import React from "react";
import { useSelector } from "react-redux";
import ProductsFilter from "../../components/products-filter";
import ProductsList from "../../components/products-list";
// import products from "./products.json"

const Products = () => {
    const isLoading: boolean = useSelector(productsIndexStore.selectors.indexIsLoadingSelector);
    const products: Product[] = useSelector(productsIndexStore.selectors.indexSelector);
    const { PaginationBar } = usePagination(productsIndexStore, {
        allowedQueryParams: ['pageNumber', 'pageSize']
    });
    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-end pt-8">
                {PaginationBar}
            </div>
            <div className="row align-items-start justify-content-center">
                <div className="col-3">
                    <ProductsFilter />
                </div>
                <div className="col-9">
                    <ProductsList products={products} />
                </div>
            </div>
        </div>
    )
};

export default Products;
