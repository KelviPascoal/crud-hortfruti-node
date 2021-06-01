export interface Product {
    _id: string;
    name: string,
    type: string,
    price: number,
}

export interface ProductCreate {
    name: string,
    type: string,
    price: number,
}

export interface ProductUpdate {
    id: string;
    name: string,
    type: string,
    price: number,
}

export interface ProductFind {
    name?: string;
    type?: string;
    page: number;
    limit: number;
}

export interface ResponsePagenation {
    totalItems: number;
    items: Product[];
}