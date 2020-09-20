import { ProductImage } from "app/modules/product-media/domain/interfaces/ProductImage";
import User from "app/modules/users/domain/interfaces/User";
import { Category } from "./Category";

export interface Product {
    id: number,
    cost: number,
    count: number,
    countType: string,
    description: string,
    category: Category,
    images: ProductImage[],
    rating: number,
    title: string,
    user: User
}