import * as yup from "yup";

export default {
    create: {
        body: yup.object().shape({
            nome: yup.string().min(3).max(100).required(),
            email: yup.string().email().required(),
            rua: yup.string().required(),
            cep: yup.string().min(8).max(8).required(),
            bairro: yup.string().required(),
            cidade: yup.string().required(),
            uf: yup.string().min(2).max(2).required(),
            numero: yup.number().min(0).max(999999).required(),
            cnpj: yup.string().min(14).max(14).required(),
        }).noUnknown(),
    },

    update: {
        body: yup.object().shape({
            nome: yup.string().min(3).max(100).required(),
            email: yup.string().email().required(),
            rua: yup.string().required(),
            cep: yup.string().min(8).max(8).required(),
            bairro: yup.string().required(),
            cidade: yup.string().required(),
            uf: yup.string().min(2).max(2).required(),
            numero: yup.number().min(0).max(999999).required(),
            cnpj: yup.string().min(14).max(14).required(),
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