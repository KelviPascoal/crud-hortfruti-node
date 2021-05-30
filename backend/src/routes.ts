import { Request, Response, Router} from 'express';
import { ProdutoController } from './controller/ProdutoController'

const routes = Router();

routes.post("/products", ProdutoController.create)
routes.get("/products", ProdutoController.findList)
routes.delete("/products/:id", ProdutoController.delete)
routes.put("/products/:id", ProdutoController.update)


export {routes};