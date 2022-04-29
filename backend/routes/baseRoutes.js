import { Router } from 'express';
import SchemaValidator from '../middlewares/validarSchemas';

class BaseRoute {
    constructor() {
        this.routes = Router();
        this.schemaValidator = new SchemaValidator();
    }
}

export default BaseRoute;