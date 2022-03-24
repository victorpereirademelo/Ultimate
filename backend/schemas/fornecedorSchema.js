import * as yup from "yup";

export default {
    create: {
        body: yup.object().shape({
            nome: yup.string().min(6).max(255).required(),
            email: yup.string().email().required(),
            rua: yup.string().required(),
            cep: yup.string().min(8).max(8).required(),
            bairro: yup.string().required(),
            cidade: yup.string().required(),
            uf: yup.string().min(2).max(2).required(),
            numero: yup.number().required(),
            cnpj: yup.string().required(),
        }).noUnknown(),
    },

    update: {
        body: yup.object().shape({
            nome: yup.string().min(5).max(255).required(),
            email: yup.string().email().required(),
            rua: yup.string().required(),
            cep: yup.string().min(8).max(8).required(),
            bairro: yup.string().required(),
            cidade: yup.string().required(),
            uf: yup.string().min(2).max(2).required(),
            numero: yup.number().required(),
            cnpj: yup.string().required(),
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