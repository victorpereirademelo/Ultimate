import Sequelize, { Model } from "sequelize";

class Fornecedor extends Model {
    static init(connection) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 100],
                        msg: 'Nome precisa ter entre 3 e 100 caracteres',
                    },
                },
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'Email inválido!',
                },
                validate: {
                    isEmail: {
                        msg: 'Email inválido!',
                    },
                },
            },
            rua: Sequelize.STRING,
            cep: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [8, 8],
                        msg: 'CEP precisa ter 8 caracteres',
                    },
                },
            },
            bairro: Sequelize.STRING,
            cidade: Sequelize.STRING,
            uf: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [2, 2],
                        msg: 'UF precisa ter 2 caracteres',
                    },
                },
            },
            numero: {
                type: Sequelize.INTEGER,
                defaultValue: null,
                validate: {
                    len: {
                        args: [2, 6],
                        msg: "Numero precisa ter entre 2 e 6 caracteres"
                    },
                    isInt: {
                        msg: 'Precisa ser um numero inteiro',
                    },
                },
            },
            cnpj: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'CNPJ inválido',
                },
                validate: {
                    len: {
                        args: [14, 14],
                        msg: ' CNPJ precisa ter 14 caracteres',
                    },
                },
            },
        },
            {
                sequelize: connection,
                paranoid: true,
                tableName: 'fornecedores',
            });

        return this;
    };
};

export default Fornecedor;