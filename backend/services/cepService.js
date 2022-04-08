import cep from "cep-promise";

class CepService {
    async index(resp) {
        const resposta = await cep(resp);

        return resposta;
    }
}

export default new CepService();