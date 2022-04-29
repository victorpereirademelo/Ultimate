import BaseRoute from "./baseRoutes";
import fornecedorController from "../controllers/FornecedorController";
import fornecedorSchema from "../schemas/fornecedorSchema";

class FornecedorRoutes extends BaseRoute {
    setup() {
        this.routes.post('/', this.schemaValidator.validate(fornecedorSchema.create), fornecedorController.createAction);
        this.routes.get('/:id?', fornecedorController.readAction);
        this.routes.put('/:id', this.schemaValidator.validate(fornecedorSchema.update), fornecedorController.updateAction);
        this.routes.delete('/:id', this.schemaValidator.validate(fornecedorSchema.delete), fornecedorController.deleteAction);

        return this.routes;
    }
}

export default new FornecedorRoutes();