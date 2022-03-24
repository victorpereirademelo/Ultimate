const validarSchemas = schemas => {
    return async (req, res, next) => {

        const chaves = Object.keys(schemas);

        const validarChaves = await Promise.all(
            chaves.map(async chave => {

                if (!schemas[chave]) {
                    return false;
                }

                return schemas[chave].isValid(req[chave]);
            }),
        );

        const temErro = validarChaves.some(item => !item);

        if (temErro) {
            return res.status(400).json({ error: 'Erro de validação' });
        }

        return next();
    };
};

export default validarSchemas;