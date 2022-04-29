import BaseRoute from "./baseRoutes";
import produtoController from "../controllers/ProdutoController";
import produtoSchema from "../schemas/produtoSchema";

class ProdutoRoutes extends BaseRoute {
    setup() {
        this.routes.post('/', this.schemaValidator.validate(produtoSchema.create), produtoController.createAction);
        this.routes.get('/:id?', produtoController.readAction);
        this.routes.put('/:id', this.schemaValidator.validate(produtoSchema.update), produtoController.updateAction);
        this.routes.delete('/:id', this.schemaValidator.validate(produtoSchema.delete), produtoController.deleteAction);

        return this.routes;
    }
}

export default new ProdutoRoutes();