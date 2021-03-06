import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';

import './database/connection';

import fornecedorRoutes from './routes/fornecedorRoutes';
import produtoRoutes from './routes/produtoRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import cepRoutes from './routes/cepRoutes';
import pdfRoutes from './routes/pdfRoutes';

class App {
    constructor() {
        dotenv.config();
        this.app = express();
    };

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
    };

    routes() {
        this.app.use('/fornecedores', fornecedorRoutes.setup());
        this.app.use('/produtos', produtoRoutes.setup());
        this.app.use('/pedidos/', pedidoRoutes.setup());
        this.app.use('/cep/', cepRoutes);
        this.app.use('/pdf/', pdfRoutes);
    };

    setup() {
        this.middlewares();
        this.routes();
        this.app.listen(3333, () => console.log('Server running'));
    };
};

export default new App();