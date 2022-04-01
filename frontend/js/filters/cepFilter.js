angular.module("fornecedores").filter("cep", function () {
    return function (value) {
        return (
            value.slice(0, 5) + '-' +
            value.slice(5, 8)
        );
    };
});