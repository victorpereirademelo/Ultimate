import express from "express";

import validarSchemas from "../middlewares/validarSchemas";
import pedidoSchema from "../schemas/pedidoSchema";

import pedidoController from "../controllers/PedidoController";

const route = express.Router();

route.post('/', validarSchemas(pedidoSchema.create), pedidoController.createAction);
route.get('/:id?', pedidoController.readAction);
route.put('/:id', validarSchemas(pedidoSchema.update), pedidoController.updateAction);
route.delete('/:id', validarSchemas(pedidoSchema.delete), pedidoController.deleteAction);

export default route;