import { ProductRepository } from "../repositories/ProductRepository";
import { Product, ProductCreate, ProductFind, ProductUpdate, ResponsePagenation } from "./types";

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

    async findByName(productFind: ProductFind): Promise<ResponsePagenation> {
        const items = await ProductRepository.findByName(productFind);
        return items;
    },
    async findByType(productFind: ProductFind): Promise<ResponsePagenation> {
        const items = await ProductRepository.findByType(productFind);
        return items;
    },
    async findByNameAndType(productFind: ProductFind): Promise<ResponsePagenation> {
        const items = await ProductRepository.findByNameAndType(productFind);
        return items;
    },
    async findAll(productFind: ProductFind): Promise<ResponsePagenation> {
        const items = await ProductRepository.findAll(productFind)
        return items;
},

    async findOneById(id: string): Promise<Product | null> {
                
        const productFinded = await ProductRepository.findOneByID(id)
        return productFinded;
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