import PedidoService from '../services/PedidoService';
import BaseController from './BaseController';

class PedidoController extends BaseController {
    constructor () {
        super();
        this.createAction = this.createAction.bind(this);
        this.readAction = this.readAction.bind(this);
        this.updateAction = this.updateAction.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
    };

    async createAction(req, res) {
        try {
            const resp = await PedidoService.create(req.body);

            this.handleResponse(res, resp);
        } catch (error) {
            this.handleError(res, error);
        }
    };

    async readAction(req, res) {
        try {
            const filter = {
                id: req.params.id,
            };

            const action = filter.id ? 'find' : 'list';
            const options = filter.id ? filter : '';

            const resp = await PedidoService[action](options);

            this.handleResponse(res, resp);
        } catch (error) {
            this.handleError(res, error);
        }
    };

    async updateAction(req, res) {
        try {
            const changes = req.body;
            const filter = {
                id: req.params.id,
            };

            await PedidoService.update(changes, filter);

            this.handleResponse(res, true);
        } catch (error) {
            this.handleError(res, error);
        }
    };

    async deleteAction(req, res) {
        try {
            const filter = {
                id: req.params.id,
            };

            await PedidoService.delete(filter);

            this.handleResponse(res, true);
        } catch (error) {
            this.handleError(res, error);
        }
    };
};

export default new PedidoController();