import Sequelize, { Model } from "sequelize";

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
            });

        return this;
    };

    static associate(models) {
        this.belongsTo(models.Fornecedor, { foreignKey: 'fornecedor_id' });
        this.belongsToMany(models.Produto, { foreignKey: 'produto_id', through: 'produto_pedido' });
    }
};

export default Pedido;