import express from "express";

import cepController from "../controllers/CepController";

const route = express.Router();

route.get('/:cep', cepController.indexAction);

export default route;