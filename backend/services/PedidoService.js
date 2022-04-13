import Pedido from "../models/Pedido";
import ProdutoPedido from "../models/ProdutoPedido";
import Produto from "../models/Produto";
import Fornecedor from '../models/Fornecedor';
import { Sequelize } from "sequelize";
// import { Transaction } from 'Sequelize';
class PedidoService {
    async create(body) {
        const { fornecedor_id, produto_id } = body;

        const pedido = await Pedido.create({ fornecedor_id });

        const produtoPedido = produto_id.map(produtoId => {
            return {
                produto_id: produtoId,
                pedido_id: pedido.id,
            };
        });

        await ProdutoPedido.bulkCreate(produtoPedido);

        const produtos = await Produto.findAll({
            where: {
                id: produto_id,
            },
            attributes: ["id", "nome", "preco"],
        });

        return {
            pedido,
            produtos,
        };
    };

    async find(filter) {
        const pedido = await Pedido.findOne({ where: filter });

        if (!pedido) {
            throw new Error('Pedido não encontrado');
        }

        const data = await ProdutoPedido.findAll({
            where: { pedido_id: filter.id },
            attributes: [],
            include: [{
                model: Pedido,
                attributes: ['id', 'situacao'],
                include: {
                    model: Fornecedor,
                    attributes: ['id', 'nome'],
                },
            },
            {
                model: Produto,
                paranoid: false,
                attributes: ['id', 'nome'],
            }],
            raw: true,
            nest: true,
        });

        const obj = {
            id: data[0].Pedido.id,
            situacao: data[0].Pedido.situacao,
            fornecedor: {
                id: data[0].Pedido.Fornecedor.id,
                nome: data[0].Pedido.Fornecedor.nome,
            },
            produtos: [],
        };

        const newObj = { ...obj };

        data.forEach(element => {
            newObj.produtos.push(element.Produto)
        });

        return newObj;
    };

    async list() {
        const data = await ProdutoPedido.findAll({
            attributes: [],
            include: [{
                model: Pedido,
                attributes: ['id', 'situacao'],
                include: {
                    model: Fornecedor,
                    attributes: ['id', 'nome'],
                },
            },
            {
                model: Produto,
                attributes: ['id', 'nome'],
                paranoid: false,
            }],
            raw: true,
            nest: true,
        });

        const pedidosID = {};

        data.forEach(produtoPedido => {
            if (!pedidosID[produtoPedido.Pedido.id]) {
                pedidosID[produtoPedido.Pedido.id] = {
                    ...produtoPedido.Pedido,
                    produtos: [],
                };
            }

            pedidosID[produtoPedido.Pedido.id].produtos.push(produtoPedido.Produto);
        });

        return Object.values(pedidosID);
    };

    async update(changes, filter) {
        const pedido = await Pedido.findOne({ where: filter });

        const produtos = await ProdutoPedido.findAll({
            attributes: [],
            include: {
                model: Produto,
                attributes: ['id'],
                where: {
                    deleted_at: null
                },
                paranoid: false
            },
            where: {
                pedido_id: pedido.id
            },
            raw: true,
            nest: true
        });

        const mappedProductIds = produtos.map(produto => {
            return produto['Produto'].id;
        });

        //NOTE: Entender como é o difference entre os ids

        if (!pedido) {
            throw new Error('Pedido não encontrado');
        }

        const { fornecedor_id, situacao, produto_id } = changes;

        const idsToRemove = mappedProductIds.filter(id => !produto_id.includes(id));
        const idsToAdd = produto_id.filter(id => !mappedProductIds.includes(id));

        console.log(idsToAdd);
        console.log(idsToRemove);

        // Pedido.update({fornecedor_id, situacao}, {
        //     where: filter,
        // })
    };

    // FIXME
    async delete(filter) {
        const pedido = await Pedido.findOne({ where: filter });

        if (!pedido) {
            throw new Error('Pedido não encontrado');
        }

        Pedido.destroy({
            where: filter,
        });
    };
};

export default new PedidoService();