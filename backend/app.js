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
        this.app = express();
    };

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());
    };

    routes() {
        this.app.use('/fornecedores/', fornecedorRoutes);
        this.app.use('/produtos/', produtoRoutes);
        this.app.use('/pedidos/', pedidoRoutes);
        this.app.use('/cep/', cepRoutes);
        this.app.use('/pdf/', pdfRoutes);
    };

    setup() {
        this.app.listen(3333, () => console.log('Server running'));
        this.middlewares();
        this.routes();
    };
};

export default new App();