import {ProdutoModel} from '../model/Produto'

export const ProductRepository = {
    async create(product: any) {
        const productCreated = await ProdutoModel.create(product);
        return productCreated;
    },

    async findList() {
        const productFind = await ProdutoModel.find().sort({name: 'asc'})
        return productFind;
    },
    
    async findByName(name: string) {
        const productFind = await ProdutoModel.find({name: { $regex: '.*' + name + '.*' }}).sort({name: 'asc'})
        return productFind;
    },
    
    async findByType(type: string) {
        const productFind = await ProdutoModel.find({type: type}).sort({name: 'asc'})
        return productFind;
    },
    
    async findByNameAndType(nameAndType: any) {
        const {name, type} = nameAndType;
        const productFind = await ProdutoModel.find({type: type, name: { $regex: '.*' + name + '.*' }}).sort({name: 'asc'})
        return productFind;
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
