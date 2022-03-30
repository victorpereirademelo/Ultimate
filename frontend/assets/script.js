angular.module("fornecedores").controller("fornecedorCtrl", function ($scope, $http) {
    $scope.app = "Fornecedores";
    $scope.contatos = [];
    $scope.msg = 'Cadastrar';

    const carregarContatos = () => {
        $http.get("http://localhost:3333/fornecedores").then(resp => {
            $scope.contatos = resp.data;
        });
    };

    const consultCep = cep => {
        $http.get(`http://localhost:3333/cep/${cep}`).then(resp => {
            $scope.contato.rua = resp.data.street;
            $scope.contato.bairro = resp.data.neighborhood;
            $scope.contato.cidade = resp.data.city;
            $scope.contato.uf = resp.data.state;
        });
    };

    const editContato = id => {
        $http.get(`http://localhost:3333/fornecedores/${id}`).then(resp => {
            $scope.msg = 'Editar';
            $scope.contato = resp.data;
        });
    };

    const submit = (contato, id = null) => {
        if (id) {
            $http.put(`http://localhost:3333/fornecedores/${id}`, contato).then(() => {
                delete $scope.contato;
                $scope.contatoForm.$setPristine();
                $scope.msg = 'Cadastrar'
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Fornecedor atualizado com sucesso',
                    showConfirmButton: false,
                    timer: 1500,
                });

                carregarContatos();
            });
            return;
        }

        $http.post("http://localhost:3333/fornecedores", contato).then(() => {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Fornecedor criado com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => carregarContatos());
        });
    };

    const excluirContatos = id => {
        Swal.fire({
            title: 'Tem certeza que deseja deletar esse fornecedor?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Deletar'
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete(`http://localhost:3333/fornecedores/${id}`);
                Swal.fire(
                    'Deletado!',
                    '',
                    'success'
                ).then(() => carregarContatos());
            }
        });
    };

    const ordenarPor = campo => {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarContatos();

    $scope.consultCep = consultCep;
    $scope.submit = submit;
    $scope.excluirContatos = excluirContatos;
    $scope.editContato = editContato;
    $scope.ordenarPor = ordenarPor;
});