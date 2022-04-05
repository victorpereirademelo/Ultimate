export default class BaseController {
    handleError(res, error) {
        res.status(500).json({ error: error.message });
    };

    handleResponse(res, data) {
        res.json(data);
    };
};