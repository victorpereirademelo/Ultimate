import CepService from "../services/cepService";
import BaseController from "./BaseController";
class CepController extends BaseController {
    constructor() {
        super();
        this.indexAction = this.indexAction.bind(this);
    }

    async indexAction(req, res) {
        try {
            const resp = req.params.cep;

            const resposta = await CepService.index(resp);

            this.handleResponse(res, resposta);
        } catch (error) {
            this.handleError(res, error);
        }
    };
};

export default new CepController();