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
        const { name, type, page, limit } = request.query;
        if (name && type) {
            const items = await ProductService.findByNameAndType({
                type: String(type),
                name: String(name),
                page: Number(page),
                limit: Number(limit)
            })
            response.status(200).json(items);
            return;
        }
        if (!name && type) {
            const items = await ProductService.findByType({
                type: String(type),
                page: Number(page),
                limit: Number(limit)

            })
            response.status(200).json(items);
            return;
        }
        if (name && !type) {
            const items = await ProductService.findByName({
                name: String(name),
                page: Number(page),
                limit: Number(limit)
            })
            response.status(200).json(items);
            return;
        }
        const items = await ProductService.findAll({
            page: Number(page),
            limit: Number(limit)
        })
        response.status(200).json(items);
    },

    async findOneById(request: Request, response: Response) {

        const id = request.params.id;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa', id);
        const productFinded = await ProductService.findOneById(id);

        console.log('productFinded', productFinded);

        response.status(200).json(productFinded);
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