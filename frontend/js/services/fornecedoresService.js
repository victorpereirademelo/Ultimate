angular.module('fornecedores').factory("fornecedoresService", function ($http, config) {
    const getFornecedores = () => $http.get(`${config.baseUrl}/fornecedores`);
    const saveFornecedor = fornecedor => $http.post(`${config.baseUrl}/fornecedores`, fornecedor);
    const editFornecedor = (id, fornecedor) => $http.put(`${config.baseUrl}/fornecedores/${id}`, fornecedor);
    const deleteFornecedor = id => $http.delete(`${config.baseUrl}/fornecedores/${id}`);
    const selectFornecedor = id => $http.get(`${config.baseUrl}/fornecedores/${id}`);

    return {
        getFornecedores,
        saveFornecedor,
        editFornecedor,
        deleteFornecedor,
        selectFornecedor,
    };
});