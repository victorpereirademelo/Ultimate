import Sequelize, { Model } from "sequelize";

class Produto extends Model {
    static init(connection) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: true,
                validate: {
                    len: {
                        args: [3, 100],
                        msg: 'Nome precisa ter entre 3 e 100 caracteres',
                    },
                },
            },
            preco: {
                type: Sequelize.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'Preço precisa ser um número inteiro ou de ponto flutuante',
                    },
                },
            },
        },
            {
                sequelize: connection,
                tableName: 'produtos',
            });

        return this;
    };

    static associate(models) {
        this.belongsToMany(models.Pedido, { foreignKey: 'pedido_id', through: 'produto_pedido' });
    }
};

export default Produto;