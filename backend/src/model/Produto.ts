import mongoose, { Schema } from 'mongoose';

const ProdutoSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: Number
})

export const ProdutoModel = mongoose.model('produto', ProdutoSchema, 'produto')

