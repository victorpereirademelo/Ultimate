import Pedido from "../models/Pedido";
import ProdutoPedido from "../models/ProdutoPedido";
import Produto from "../models/Produto";
import Fornecedor from '../models/Fornecedor';
import Sequelize from '../database/connection';

class PedidoService {
    async verifica(id) {
        const pedidoCount = await Pedido.count({ where: id });

        const temPedido = !!pedidoCount;

        if (!temPedido) {
            throw new Error('Pedido não encontrado');
        }
    };

    async create(data) {
        const { fornecedor_id: fornecedorId, produto_id: produtoIds } = data;

        const pedido = await Pedido.create({ fornecedor_id: fornecedorId });

        const produtoPedido = produtoIds.map(produtoId => {
            return {
                produto_id: produtoId,
                pedido_id: pedido.id,
            };
        });

        await ProdutoPedido.bulkCreate(produtoPedido);

        const produtos = await Produto.findAll({
            where: {
                id: produtoIds,
            },
            attributes: ["id", "nome", "preco"],
        });

        return {
            pedido,
            produtos,
        };
    };

    async find(filter) {
        await this.verifica(filter);

        const pedido = await Pedido.scope('includesFornecedor').findOne({
            where: filter,
            attributes: ['id', 'situacao']
        });

        const data = await ProdutoPedido.findAll({
            where: { pedido_id: filter.id },
            attributes: [],
            include: [
                {
                    model: Produto,
                    paranoid: false,
                    attributes: ['id', 'nome'],
                }],
            raw: true,
            nest: true,
        });

        const obj = {
            id: pedido.id,
            situacao: pedido.situacao,
            fornecedor: {
                id: pedido.Fornecedor.id,
                nome: pedido.Fornecedor.nome,
            },
            produtos: data.map(element => element.Produto),
        };

        return obj;
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
                    paranoid: false,
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
        const transaction = await Sequelize.transaction();

        try {
            const pedido = await Pedido.findOne({ where: filter, raw: true, nest: true });

            if (!pedido) {
                throw new Error('Pedido não encontrado');
            }

            const produtos = await ProdutoPedido.findAll({
                where: {
                    pedido_id: pedido.id
                },
                attributes: [],
                include: {
                    model: Produto,
                    attributes: ['id'],
                    where: {
                        deleted_at: null,
                    },
                    paranoid: false,
                },
                raw: true,
                nest: true
            });

            const idsDosProdutosMapeados = produtos.map(produto => produto.Produto.id);
            console.log(idsDosProdutosMapeados, 'Estado Inicial');

            const { fornecedor_id, situacao, produto_id } = changes;

            const idsParaRemover = idsDosProdutosMapeados.filter(id => !produto_id.includes(id));

            const idsParaAdicionar = produto_id.filter(id => !idsDosProdutosMapeados.includes(id));

            const produtosBulk = idsParaAdicionar.map(idToAdd => {
                return {
                    pedido_id: pedido.id,
                    produto_id: idToAdd
                }
            });

            const promises = [
                Pedido.update({ fornecedor_id, situacao }, {
                    where: filter,
                    transaction,
                    // logging: true
                }),

                ProdutoPedido.destroy({
                    where: {
                        pedido_id: pedido.id,
                        produto_id: idsParaRemover
                    },
                    transaction,
                    // logging: true
                }),

                ProdutoPedido.bulkCreate(produtosBulk, {
                    transaction,
                    // logging: true
                }),
            ];

            await Promise.all(promises);

            await transaction.commit();
        }
        catch (error) {
            await transaction.rollback();
            throw new Error('Não foi possível editar esse pedido');
        }
    };

    async delete(filter) {
        await this.verifica(filter);

        Pedido.destroy({
            where: filter,
        });
    };
};

export default new PedidoService();