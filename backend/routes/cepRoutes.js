import express from "express";

import cepController from "../controllers/CepController";

const route = express.Router();

route.get('/', cepController.indexAction);

export default route;