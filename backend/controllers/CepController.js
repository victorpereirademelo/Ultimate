import cep from 'cep-promise'

class CepController {
    async indexAction(req, res) {
        try {
            const resp = req.params.cep;

            const resposta = await cep(resp)

            return res.json(resposta)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};

export default new CepController();