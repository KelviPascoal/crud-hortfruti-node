import { ProductRepository } from "../repositories/ProductRepository";
import { Product, ProductCreate, ProductFind, ProductUpdate } from "./types";

export const ProductService = {
    async create(product: ProductCreate): Promise<Product> {
        const { name, type, price } = product;
        if (!name || !type || !price) {
            throw new Error('Preencha todos os campos antes de adicionar um produto')
        }
        const productCreated = await ProductRepository.create(product);
        return productCreated;
    },

    // async findList(product :ProductFind): Promise<Product[]> {

    async findByName(productFind: ProductFind): Promise<Product[] | null> {
        const productFinded = await ProductRepository.findByName(productFind);
        return productFinded;
    },
    async findByType(productFind: ProductFind): Promise<Product[]> {
        const productFinded = await ProductRepository.findByType(productFind);
        return productFinded;
    },
    async findByNameAndType(productFind: ProductFind): Promise<Product[]> {
        const productFinded = await ProductRepository.findByNameAndType(productFind);
        return productFinded;
    },
    async findAll(): Promise<Product[]> {
        const productFind = await ProductRepository.findAll()
        return productFind;
},

    async findOneById(id: string): Promise<Product | null> {
        const productFind = await ProductRepository.findOneByID(id)
        return productFind;
    },

        async delete (id: string) {
    await ProductRepository.delete(id)
},

async update(product: ProductUpdate)  {
    const { name, type, price } = product;
    if (!name || !type || !price) {
        throw new Error('Preencha todos os campos antes de adicionar um produto')
    }
    const productUpdate = await ProductRepository.update(product);
    return productUpdate;
},
}