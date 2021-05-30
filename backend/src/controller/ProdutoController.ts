import { Request, Response } from 'express';
import { ProductService } from '../services/ProductServices';

export const ProdutoController = {
    async create(request: Request, response: Response) {
        const {name, type, price} = request.body;
        const product = {
            name,
            type,
            price
        }
        const productCreated = await ProductService.create(product);
        response.status(201).json(productCreated);
    },

    async findList(request: Request, response: Response) {
        const {query} = request
        const productFind = await ProductService.findList(query)

        response.status(200).json(productFind);
    },

    async delete(request: Request, response: Response) {
        const {id} = request.params
        
        await ProductService.delete(id)

        response.status(204).json({ message: 'produto deletado.'});
    },
    async update(request: Request, response: Response) {
        const id = request.params.id
        const {name, type, price} = request.body;

        const product = {id, name, type, price} 

        const productUpdated = await ProductService.update(product)

        response.status(201).json(productUpdated);
    }
        
}