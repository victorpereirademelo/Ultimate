angular.module('fornecedores').factory("pedidosService", function ($http, config) {
    const getPedidos = () => $http.get(`${config.baseUrl}/pedidos`);
    const savePedido = pedido => $http.post(`${config.baseUrl}/pedidos`, pedido);
    const editPedido = (id, pedido) => $http.put(`${config.baseUrl}/pedidos/${id}`, pedido);
    const deletePedido = id => $http.delete(`${config.baseUrl}/pedidos/${id}`);
    const selectPedido = id => $http.get(`${config.baseUrl}/pedidos/${id}`);

    return {
        getPedidos,
        savePedido,
        editPedido,
        deletePedido,
        selectPedido,
    };
});