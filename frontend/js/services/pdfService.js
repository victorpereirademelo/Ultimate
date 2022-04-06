angular.module('fornecedores').service("pdfService", function ($http, config) {
    this.getPDF = id => $http.get(`${config.baseUrl}/pdf/${id}`);
});