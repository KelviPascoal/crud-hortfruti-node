import { Request, Response } from 'express';
import { ProductService } from '../services/ProductServices';

export const ProdutoController = {

    async create(request: Request, response: Response) {
        const { name, type, price } = request.body;

        const product = {
            name,
            type,
            price,
        }

        const productCreated = await ProductService.create(product);
        response.status(201).json(productCreated);
    },

    async findList(request: Request, response: Response) {
        const { name, type } = request.query
        const productFind ={
            name: String(name),
            type: String(type)
        }

        if (name && type) {
            const products = await ProductService.findByNameAndType(productFind)
            response.status(200).json(products);
            return;
        }
        if (!name && type) {
            const products = await ProductService.findByType({type: String(type)})
            response.status(200).json(products);
            return;
        }
        if (name && !type) {            
            const products = await ProductService.findByName({name: String(name)})
            response.status(200).json(products);
            return;
        }
            const products = await ProductService.findAll()
            response.status(200).json(products);
    },

    async findOneById(request: Request, response: Response) {

        const { id } = request.params

        const products = await ProductService.findOneById(id)

        response.status(200).json(products);
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params
        await ProductService.delete(id)

        response.status(204).json({ message: 'produto deletado.' });
    },

    async update(request: Request, response: Response) {
        const id = request.params.id
        const { name, type, price } = request.body;

        const product = { id, name, type, price }

        const productUpdated = await ProductService.update(product)

        response.status(201).json(productUpdated);
    }
}