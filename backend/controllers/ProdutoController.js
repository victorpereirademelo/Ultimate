import ProdutoService from '../services/ProdutoService';

class ProdutoController {
    async createAction(req, res) {
        try {
            const resp = await ProdutoService.create(req.body);

            return res.json(resp);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async readAction(req, res) {
        try {
            const filter = {
                id: req.params.id,
            };
            const action = filter.id ? 'find' : 'list';
            const options = filter.id ? filter : '';

            const resp = await ProdutoService[action](options);

            return res.json(resp);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async updateAction(req, res) {
        try {
            const changes = req.body;
            const filter = {
                id: req.params.id,
            };

            const resp = await ProdutoService.update(changes, filter);

            return res.status(200).json({
                resp: resp[0] === 1 ? 'Editado com Sucesso' : '',
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async deleteAction(req, res) {
        try {
            const filter = {
                id: req.params.id,
            };

            const resp = await ProdutoService.delete(filter);

            return res.status(200).json({
                resp: resp === 1 ? 'Apagado com Sucesso' : '',
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};

export default new ProdutoController();