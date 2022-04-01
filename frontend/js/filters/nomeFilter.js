angular.module("fornecedores").filter("nome", function () {
    return function (value) {
        const listaDeNomes = value.split(" ");

        const listaDeNomesFormatadas = listaDeNomes.map(nome => {
            if (/(da|de)/.test(nome)) {
                return nome;
            }

            return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
        });

        return listaDeNomesFormatadas.join(" ");
    };
});