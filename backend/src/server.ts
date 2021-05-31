import express from 'express';
import cors from 'cors'
import { routes } from './routes';
import mongoose from 'mongoose'

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/hortfruti-local', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(routes)

app.listen("3333", () => {
    console.log("🐔 server is running");
} )
 