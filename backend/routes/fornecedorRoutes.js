import express from "express";

import validarSchemas from "../middlewares/validarSchemas";
import fornecedorSchema from "../schemas/fornecedorSchema";

import fornecedorController from "../controllers/FornecedorController";

const route = express.Router();

route.post('/', validarSchemas(fornecedorSchema.create), fornecedorController.createAction);
route.get('/:id?', fornecedorController.readAction);
route.put('/:id', validarSchemas(fornecedorSchema.update), fornecedorController.updateAction);
route.delete('/:id', validarSchemas(fornecedorSchema.delete), fornecedorController.deleteAction);

export default route;