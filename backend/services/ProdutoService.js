import { Op } from "sequelize";
import Produto from "../models/Produto";

class ProdutoService {
    async verifica(id) {
        const produtoCount = await Produto.count({ where: { id } });

        const temProduto = !!produtoCount;

        if (!temProduto) {
            throw new Error('Produto não encontrado');
        }
    };

    async create(data) {
        const produto = await Produto.count({
            where: { nome: data.nome },
        });

        if (!!produto) {
            throw new Error('Esse produto já existe');
        }

        return Produto.create(data);
    };

    async find(filter) {
        await this.verifica(filter.id);

        const produto = await Produto.findOne({ where: filter });

        return produto;
    };

    list() {
        return Produto.findAll({
            order: [['id', 'DESC']],
        });
    };

    async update(changes, filter) {
        await this.verifica(filter.id);

        const produtoAnalise = await Produto.count({
            where: {
                nome: changes.nome,
                id: {
                    [Op.ne]: filter.id, // not equal -> compara e busca os diferentes ids (nesse caso)
                },
            },
            raw: true,
            nest: true,
        });

        const analise = !!produtoAnalise;

        if (analise) {
            throw new Error('Esse produto já existe');
        }

        return Produto.update(changes, {
            where: filter,
        });
    };

    async delete(filter) {
        await this.verifica(filter.id);

        return Produto.destroy({
            where: filter,
        });
    };
};

export default new ProdutoService();