import mongoose, { Schema } from 'mongoose';
import { Product } from '../services/types';

const ProdutoSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: Number
})

export const ProdutoModel = mongoose.model<Product>('produto', ProdutoSchema, 'produto')

