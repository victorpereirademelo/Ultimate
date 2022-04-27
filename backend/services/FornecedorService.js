import Fornecedor from "../models/Fornecedor";

class FornecedorService {
    async verifica(id) {
        const fornecedorCount = await Fornecedor.count({ where: { id } });

        const temFornecedor = !!fornecedorCount; // Parse Boolean

        if (!temFornecedor) {
            throw new Error('Fornecedor não encontrado');
        }
    };

    create(data) {
        return Fornecedor.create(data);
    };

    async find(filter) {
        await this.verifica(filter.id);

        return Fornecedor.findOne({ where: filter });
    };

    list() {
        return Fornecedor.findAll();
    };

    async update(changes, filter) {
        await this.verifica(filter.id);

        return Fornecedor.update(changes, {
            where: filter,
        });
    };

    async delete(filter) {
        await this.verifica(filter.id);

        return Fornecedor.destroy({
            where: { id: filter.id },
        });
    };
};

export default new FornecedorService();