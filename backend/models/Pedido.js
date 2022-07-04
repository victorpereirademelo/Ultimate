import Sequelize, { Model } from "sequelize";
import Fornecedor from "./Fornecedor";

class Pedido extends Model {
    static init(connection) {
        super.init({
            situacao: {
                type: Sequelize.ENUM('Aberto', 'Cancelado', 'Finalizado'),
                allowNull: false,
                defaultValue: 'Aberto',
            },
            fornecedor_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
            {
                sequelize: connection,
                tableName: 'pedidos',
                scopes: {
                    includesFornecedor: {
                        include: [{
                            model: Fornecedor,
                            attributes: ['id', 'nome'],
                            paranoid: false,
                        }],
                    }
                }
            });

        return this;
    };

    static associate(models) {
        this.belongsTo(models.Fornecedor, { foreignKey: 'fornecedor_id' });
        this.belongsToMany(models.Produto, { foreignKey: 'produto_id', through: 'produto_pedido' });
    }
};

export default Pedido;