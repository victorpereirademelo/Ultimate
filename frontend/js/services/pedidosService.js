angular.module('fornecedores').factory("pedidosService", function ($http, config) {
    const getPedidos = () => $http.get(`${config.baseUrl}/pedidos`);
    // const saveProduto = produto => $http.post(`${config.baseUrl}/produtos`, produto);
    const editPedido = (id, pedido) => $http.put(`${config.baseUrl}/pedidos/${id}`, pedido);
    const deletePedido = id => $http.delete(`${config.baseUrl}/pedidos/${id}`);
    const selectPedido = id => $http.get(`${config.baseUrl}/pedidos/${id}`);

    return {
        getPedidos,
        // saveProduto,
        editPedido,
        deletePedido,
        selectPedido,
    };
});