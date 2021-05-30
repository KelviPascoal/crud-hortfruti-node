import { ProductRepository } from "../repositories/ProductRepository";

export const ProductService = {
    async create(product: any) {
    const {name, type, price} = product;
        if(!name || !type || !price) {
            throw new Error('Preencha todos os campos antes de adicionar um produto')
        }
        const productCreated = await ProductRepository.create(product);
        return productCreated;
    },

    async findList(query: any) {
        const {name, type} = query;
        const nameAndType = {name, type};
        if (name && !type ){
        const productFind = await ProductRepository.findByName(name)
        return productFind;
        }
        if (!name && type ){
            const productFind = await ProductRepository.findByType(type)
            return productFind;
        }
        if (name && type ){
            const productFind = await ProductRepository.findByNameAndType(nameAndType)
            return productFind;
            }
        const productFind = await ProductRepository.findList()
        return productFind;

    },
    async delete(id: string) {
        await ProductRepository.delete(id)
    },
    async update(product: any) {
        const {name, type, price, id} = product;
            if(!name || !type || !price) {
                throw new Error('Preencha todos os campos antes de adicionar um produto')
            }
            const productUpdate = await ProductRepository.update(product);
            return productUpdate;
        },
}