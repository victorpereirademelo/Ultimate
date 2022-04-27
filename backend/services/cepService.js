import cep from "cep-promise";

class CepService {
    async index(resp) {
        const cepEncontrado = await cep(resp);

        return cepEncontrado;
    };
};

export default new CepService();