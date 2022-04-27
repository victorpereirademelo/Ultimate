import express from "express";

import pdfController from "../controllers/PDFController";

const route = express.Router();

route.get('/:id', pdfController.index);

export default route;