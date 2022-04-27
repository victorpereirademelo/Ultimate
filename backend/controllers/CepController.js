import CepService from "../services/CepService";
import BaseController from "./BaseController";
class CepController extends BaseController {
    constructor() {
        super();

        this.indexAction = this.indexAction.bind(this);
    };

    async indexAction(req, res) {
        try {
            const filter = req.params.cep;

            const resp = await CepService.index(filter);

            this.handleResponse(res, resp);
        } catch (error) {
            this.handleError(res, error);
        }
    };
};

export default new CepController();