import BaseRoute from "./baseRoutes";
import pedidoSchema from "../schemas/pedidoSchema";
import pedidoController from "../controllers/PedidoController";

class PedidoRoutes extends BaseRoute {
    setup() {
        this.routes.post('/', this.schemaValidator.validate(pedidoSchema.create), pedidoController.createAction);
        this.routes.get('/:id?', pedidoController.readAction);
        this.routes.put('/:id', this.schemaValidator.validate(pedidoSchema.update), pedidoController.updateAction);
        this.routes.delete('/:id', this.schemaValidator.validate(pedidoSchema.delete), pedidoController.deleteAction);

        return this.routes;
    };
};

export default new PedidoRoutes();