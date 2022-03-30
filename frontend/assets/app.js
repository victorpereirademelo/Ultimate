const app = angular.module("fornecedores", ['ui.mask']);

app.filter('cnpj', function () {
    return function (value) {
        return (
            value.slice(0, 2) + '.' +
            value.slice(2, 5) + '.' +
            value.slice(5, 8) + '/' +
            value.slice(8, 12) + '-' +
            value.slice(12, 14)
        );
    };
});

app.filter('cep', function () {
    return function (value) {
        return (
            value.slice(0, 5) + '-' +
            value.slice(5, 8)
        );
    };
});