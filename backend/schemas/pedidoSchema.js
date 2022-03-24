import * as yup from "yup";

export default {
    create: {
        body: yup.object().shape({
            situacao: yup.mixed().oneOf(["Aberto", "Cancelado", "Finalizado"]).default('Aberto'),
            fornecedor_id: yup.number().required(),
            produto_id: yup.array().required(),
        }).noUnknown(),
    },

    update: {
        body: yup.object().shape({
            situacao: yup.mixed().oneOf(["Aberto", "Cancelado", "Finalizado"]).required(),
        }).noUnknown(),

        params: yup.object({
            id: yup.number().required(),
        }).noUnknown(),
    },

    delete: {
        params: yup.object({
            id: yup.number().required(),
        }).noUnknown(),
    },
};