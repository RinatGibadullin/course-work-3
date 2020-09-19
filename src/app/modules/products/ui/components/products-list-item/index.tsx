import { Product } from "app/modules/products/domain/interfaces/Product";
import React from "react";
import Chip from "@material-ui/core/Chip";
import { StyledProductCard } from "./styles";
import { useHistory } from "react-router-dom";
import UDButton from "app/modules/ud-ui/button/button";

type Props = {
    product: Product
}

const ProductsListItem = (props: Props) => {
    const history = useHistory();
    const { product } = props
    return (
        <StyledProductCard onClick={() => history.push("/prosucts/" + product.id)}>
            {/* <ProductImages
                    product_id={product.id}
                    images={product.images}
                /> */}
            <div className="container-fluid">
                <div className="row align-items-center justify-content-center">
                    <p className="bold-text fs16" >{product.title}</p>
                </div>

                <div className="row align-items-center justify-content-between p-4">
                    <Chip
                        variant="outlined"
                        color="secondary"
                        label={product.cost + ' РУБ.'}
                    />
                    <UDButton label="КУПИТЬ" />

                </div>
            </div>
        </StyledProductCard>
    )
};

export default ProductsListItem;
