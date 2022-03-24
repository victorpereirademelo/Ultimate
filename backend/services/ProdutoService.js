import Produto from "../models/Produto";

class ProdutoService {
    async create(data) {
        const produto = await Produto.findOne({
            where: { nome: data.nome },
        });

        if (produto) {
            throw new Error('Esse produto já existe');
        }

        return Produto.create(data);
    };

    async find(filter) {
        const produto = await Produto.findOne({ where: filter });

        if (!produto) {
            throw new Error('Produto não encontrado');
        }

        return produto;
    };

    list() {
        return Produto.findAll();
    };

    async update(changes, filter) {
        const produto = await Produto.findOne({ where: filter });

        if (!produto) {
            throw new Error('Produto não existe');
        }

        const produtoAnalise = await Produto.findOne({
            where: { nome: changes.nome },
        });

        if (produtoAnalise) {
            throw new Error('Esse produto já existe');
        }

        return Produto.update(changes, {
            where: filter,
        });
    };

    async delete(filter) {
        const produto = await Produto.findOne({ where: filter });

        if (!produto) {
            throw new Error('Produto não existe');
        }

        return Produto.destroy({
            where: filter,
        });
    };
};

export default new ProdutoService();