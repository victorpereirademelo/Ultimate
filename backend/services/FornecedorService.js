import Fornecedor from "../models/Fornecedor";

class FornecedorService {
    create(data) {
        return Fornecedor.create(data);
    };

    async find(filter) {
        const fornecedor = await Fornecedor.findOne({ where: filter });

        if (!fornecedor) {
            throw new Error('Fornecedor não encontrado');
        }

        return fornecedor;
    };

    list() {
        return Fornecedor.findAll();
    };

    async update(changes, filter) {
        const fornecedor = await Fornecedor.findOne({ where: filter });

        if (!fornecedor) {
            throw new Error('Fornecedor não existe');
        }

        return Fornecedor.update(changes, {
            where: filter,
        });
    };

    async delete(filter) {
        const fornecedor = await Fornecedor.findOne({ where: filter });

        if (!fornecedor) {
            throw new Error('Fornecedor não existe');
        }

        return Fornecedor.destroy({
            where: { id: filter.id },
        });
    };
};

export default new FornecedorService();