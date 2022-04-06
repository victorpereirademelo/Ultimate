angular.module("fornecedores").config(function ($routeProvider) {
    $routeProvider.otherwise("/fornecedores");

    $routeProvider.when("/fornecedores", {
        templateUrl: "./view/fornecedores.html",
        controller: "fornecedorCtrl"
    });

    $routeProvider.when("/produtos", {
        templateUrl: "./view/produtos.html",
        controller: "produtoCtrl"
    });

    $routeProvider.when("/pedidos", {
        templateUrl: "./view/pedidos.html",
        controller: "pedidoCtrl"
    });

    $routeProvider.when("/adicionarpedidos", {
        templateUrl: "./view/adicionarPedidos.html",
        controller: "pedidoCtrl",
    });
});