import Sequelize, { Model } from "sequelize";

class ProdutoPedido extends Model {
    static init(connection) {
        super.init({
            produto_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            pedido_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
            {
                sequelize: connection,
                tableName: 'produto_pedido',
            });

        return this;
    };

    static associate(models) {
        this.belongsTo(models.Produto, { foreignKey: 'produto_id' });
        this.belongsTo(models.Pedido, { foreignKey: 'pedido_id' });
    }
};

export default ProdutoPedido;