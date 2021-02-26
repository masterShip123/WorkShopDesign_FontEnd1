export class Product {
    name: string;
    stock: number;
    price: number;
    image: any;
}

export interface ProductResponse {
    id: number;
    name: string;
    image: string;
    stock: number | null;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}