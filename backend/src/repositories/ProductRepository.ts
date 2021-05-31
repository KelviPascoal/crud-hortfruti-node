import {ProdutoModel} from '../model/Product'
import { Product, ProductFind } from '../services/types';

export const ProductRepository = {
    async create(product: any) {
        const productCreated = await ProdutoModel.create(product);
        return productCreated;
    },

    async findAll(): Promise<Product[]> {
        const productFinded = await ProdutoModel.find().sort({name: 'asc'})
        return productFinded;
    },
    
    async findByName(productFind: ProductFind): Promise<Product[]>{
        const nameValue = productFind.name
        const productFinded = await ProdutoModel.find({name: { $regex: '.*' + nameValue + '.*' }}).sort({name: 'asc'})
        return productFinded;
    },
    
    async findByType(productFind: ProductFind): Promise<Product[]> {
        const typeValue = productFind.type
        const productFinded = await ProdutoModel.find({type: typeValue}).sort({name: 'asc'})
        return productFinded;
    },

    async findOneByID(id: string): Promise<Product | null> {
        const productFinded = await ProdutoModel.findById(id)
        return productFinded;
    },
    
    async findByNameAndType(nameAndType: ProductFind) {
        const {name, type} = nameAndType;
        const productFinded = await ProdutoModel.find({type: type, name: { $regex: '.*' + name + '.*' }}).sort({name: 'asc'})
        return productFinded;
    },

    async delete(id: string) {
        await ProdutoModel.findOneAndDelete({_id: id})
    },

    async update(product: any) {
        await ProdutoModel.updateOne({ _id: product.id },
             { $set: 
                { 
                    name: product.name,
                    type: product.type,
                    price: product.price
             } });
        const productUpudate = await ProdutoModel.findOne({_id: product.id})
        return productUpudate;
    },


}