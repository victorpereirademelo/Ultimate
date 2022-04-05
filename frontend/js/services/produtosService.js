angular.module('fornecedores').factory("produtosService", function ($http, config) {
    const getProdutos = () => $http.get(`${config.baseUrl}/produtos`);
    const saveProduto = produto => $http.post(`${config.baseUrl}/produtos`, produto);
    const editProduto = (id, produto) => $http.put(`${config.baseUrl}/produtos/${id}`, produto);
    const deleteProduto = id => $http.delete(`${config.baseUrl}/produtos/${id}`);
    const selectProduto = id => $http.get(`${config.baseUrl}/produtos/${id}`);

    return {
        getProdutos,
        saveProduto,
        editProduto,
        deleteProduto,
        selectProduto,
    };
});