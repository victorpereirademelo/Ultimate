import express from "express";

import validarSchemas from "../middlewares/validarSchemas";
import produtoSchema from "../schemas/produtoSchema";

import produtoController from "../controllers/ProdutoController";

const route = express.Router();

route.post('/', validarSchemas(produtoSchema.create), produtoController.createAction);
route.get('/:id?', produtoController.readAction);
route.put('/:id', validarSchemas(produtoSchema.update), produtoController.updateAction);
route.delete('/:id', validarSchemas(produtoSchema.delete), produtoController.deleteAction);

export default route;