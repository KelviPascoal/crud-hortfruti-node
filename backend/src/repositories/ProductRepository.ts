import {ProdutoModel} from '../model/Product'
import { ResponsePagenation, Product, ProductFind } from '../services/types';

export const ProductRepository = {
    async create(product: any) {
        const productCreated = await ProdutoModel.create(product);
        return productCreated;
    },

    async findAll(productFind: ProductFind): Promise<ResponsePagenation> {
        const {limit, page} = productFind
        const offset = (page - 1) * limit;
        const count = await ProdutoModel.find().count()
        const productFinded = await ProdutoModel.find().sort({name: 'asc'}).skip(offset).limit(limit);
        const items: ResponsePagenation = {
            totalItems: count,
            items: productFinded
        }
        return items;
    },
    
    async findByName(productFind: ProductFind): Promise<ResponsePagenation>{
        const {name, limit} = productFind
        const offset = (productFind.page - 1) * limit;
        const count = await ProdutoModel.find({name: { $regex: '.*' + name + '.*' }}).count()
        const productFinded = await ProdutoModel.find({name: { $regex: '.*' + name + '.*' }})
        .sort({name: 'asc'}).skip(offset).limit(limit);
        
        const items: ResponsePagenation = {
            totalItems: count,
            items: productFinded
        }
        return items;
    },
    
    async findByType(productFind: ProductFind): Promise<ResponsePagenation> {
        const {type, limit, page} = productFind;
        const offset = (page - 1) * limit;
        const count = await ProdutoModel.find({type: type}).count()
        const productFinded = await ProdutoModel.find({type: type})
        .sort({name: 'asc'}).skip(offset).limit(limit);
        const items: ResponsePagenation = {
            totalItems: count,
            items: productFinded
        }
        return items;
    },

    async findByNameAndType(productFind: ProductFind): Promise<ResponsePagenation> {
        const {name, type, page, limit} = productFind;
        const offset = (page - 1) * limit;
        const count = await ProdutoModel.find({type: type, name: { $regex: '.*' + name + '.*' }}).count()
        const productFinded = await ProdutoModel.find({type: type, name: { $regex: '.*' + name + '.*' }})
        .sort({name: 'asc'}).skip(offset).limit(limit);
        const items: ResponsePagenation = {
            totalItems: count,
            items: productFinded
        }
        return items;
    },

    async findOneByID(id: string): Promise<Product | null> {
        const productFinded = await ProdutoModel.findOne({_id: id})
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