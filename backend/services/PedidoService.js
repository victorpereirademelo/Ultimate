import Pedido from "../models/Pedido";
import ProdutoPedido from "../models/ProdutoPedido";
import Produto from "../models/Produto";

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

        return pedido;
    };

    list() {
        return Pedido.findAll();
    };

    async update(changes, filter) {
        const pedido = await Pedido.findOne({ where: filter });

        if (!pedido) {
            throw new Error('Pedido não encontrado');
        }

        return Pedido.update(changes, {
            where: filter,
        });
    };

    async delete(filter) {
        const pedido = await Pedido.findOne({ where: filter });

        if (!pedido) {
            throw new Error('Pedido não encontrado');
        }

        return Pedido.destroy({
            where: filter,
        });
    };
};

export default new PedidoService();