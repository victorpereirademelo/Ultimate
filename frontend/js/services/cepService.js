angular.module('fornecedores').service("cepService", function ($http, config) {
    this.getCep = cep => $http.get(`${config.baseUrl}/cep/${cep}`);
});