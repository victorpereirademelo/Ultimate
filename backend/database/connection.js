import Sequelize from "sequelize";
import { development } from "../config/config";

import Fornecedor from "../models/Fornecedor";
import Produto from "../models/Produto";
import Pedido from "../models/Pedido";
import ProdutoPedido from "../models/ProdutoPedido";

const models = [Fornecedor, Produto, Pedido, ProdutoPedido];

const connection = new Sequelize(development);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));

export default connection;