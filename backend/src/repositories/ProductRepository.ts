import {ProdutoModel} from '../model/Product'
import { ResponsePagination, Product, ProductFind } from '../services/types';

export const ProductRepository = {
    async create(product: any) {
        const productCreated = await ProdutoModel.create(product);
        return productCreated;
    },

    async findAll(productFind: ProductFind): Promise<ResponsePagination> {
        const {limit, page} = productFind
        const offset = (page - 1) * limit;
        const count = await ProdutoModel.find().count()
        const productFound = await ProdutoModel.find().sort({name: 'asc'}).skip(offset).limit(limit);
        const items: ResponsePagination = {
            totalItems: count,
            items: productFound
        }
        return items;
    },
    
    async findByName(productFind: ProductFind): Promise<ResponsePagination>{
        
        const {name, limit} = productFind
        const test = "/"+name+"/i" ;
        const offset = (productFind.page - 1) * limit;
        const count = await ProdutoModel
        .find({name: { $regex: new RegExp(name || "", 'i') }})
        .count()
        const productFound = await ProdutoModel
        .find({name: { $regex: new RegExp(name || "", 'i') }})
        .sort({name: 'asc'})
        .skip(offset)
        .limit(limit);
        
        const items: ResponsePagination = {
            totalItems: count,
            items: productFound
        }
        return items;
    },
    
    async findByType(productFind: ProductFind): Promise<ResponsePagination> {
        const {type, limit, page} = productFind;
        const offset = (page - 1) * limit;
        const count = await ProdutoModel.find({type: type}).count()
        const productFound = await ProdutoModel.find({type: type})
        .sort({name: 'asc'}).skip(offset).limit(limit);
        const items: ResponsePagination = {
            totalItems: count,
            items: productFound
        }
        return items;
    },

    async findByNameAndType(productFind: ProductFind): Promise<ResponsePagination> {
        const {name, type, page, limit} = productFind;
        const offset = (page - 1) * limit;
        const count = await ProdutoModel
        .find({type: type, name: { $regex: new RegExp(name || "", 'i') }})
        .count()
        const productFound = await ProdutoModel.find({type: type, name: { $regex: new RegExp(name || "", 'i') }})
        .sort({name: 'asc'})
        .skip(offset)
        .limit(limit);
        const items: ResponsePagination = {
            totalItems: count,
            items: productFound
        }
        return items;
    },

    async findOneByID(id: string): Promise<Product | null> {
        const productFound = await ProdutoModel.findOne({_id: id})
        return productFound;
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