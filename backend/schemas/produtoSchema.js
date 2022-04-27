import * as yup from "yup";

export default {
    create: {
        body: yup.object().shape({
            nome: yup.string().min(3).max(100).required(),
            preco: yup.number().required(),
        }).noUnknown(),
    },

    update: {
        body: yup.object().shape({
            nome: yup.string().min(3).max(100).required(),
            preco: yup.number().required(),
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