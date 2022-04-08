angular.module("fornecedores").filter("preco", function () {
    return function (value) {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    };
});