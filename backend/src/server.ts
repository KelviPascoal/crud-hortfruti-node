import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import { routes } from './routes';
import mongoose, { Error } from 'mongoose'

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/hortfruti-local', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(routes)
// app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
//     response.status(error. || 500)
// })


app.listen("3333", () => {
    console.log("🐔 server is running");
} )
 