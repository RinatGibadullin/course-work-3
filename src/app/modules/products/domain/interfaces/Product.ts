import User from "app/modules/users/domain/interfaces/User";

export interface Product {
    id: number,
    cost: number,
    count: number,
    countType: string,
    description: string,
    category: {
        id: number,
        name: string
    },
    images: Image[],
    rating: number,
    title: string,
    user: User
}

export interface Image {
    id: number,
    name: string
}