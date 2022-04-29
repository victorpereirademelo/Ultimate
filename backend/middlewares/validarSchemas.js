class SchemaValidator {
    validate(schema) {
        return async (req, res, next) => {
            const chaves = Object.keys(schema);

            const validarChaves = await Promise.all(
                chaves.map(chave => {

                    if (!schema[chave]) {
                        return false;
                    }

                    return schema[chave].isValid(req[chave]);
                }),
            );

            const temErro = validarChaves.some(item => !item);

            if (temErro) {
                return res.status(400).json({ error: 'Erro de validação' });
            }

            return next();
        };
    };
};

export default SchemaValidator;