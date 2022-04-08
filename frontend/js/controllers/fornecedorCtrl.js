angular.module("fornecedores").controller("fornecedorCtrl", function ($scope, fornecedoresService, cepService) {
    $scope.app = "Fornecedores";
    $scope.fornecedores = [];
    $scope.msg = 'Cadastrar';

    const carregarFornecedores = () => {
        fornecedoresService.getFornecedores().then(resp => {
            $scope.fornecedores = resp.data;
        }).catch((data, status) => {
            $scope.error = "Não foi possível carregar os dados!";
        });
    };

    const consultCep = cep => {
        cepService.getCep(cep).then(resp => {
            $scope.fornecedor.rua = resp.data.street;
            $scope.fornecedor.bairro = resp.data.neighborhood;
            $scope.fornecedor.cidade = resp.data.city;
            $scope.fornecedor.uf = resp.data.state;
        });
    };

    const editarFornecedor = id => {
        fornecedoresService.selectFornecedor(id).then(resp => {
            $scope.msg = 'Editar';
            $scope.fornecedor = resp.data;
        });
    };

    const submit = (fornecedor, id) => {
        if (id) {
            fornecedoresService.editFornecedor(id, fornecedor).then(() => {
                delete $scope.fornecedor;
                $scope.fornecedorForm.$setPristine();
                $scope.msg = 'Cadastrar'
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Fornecedor atualizado com sucesso',
                    showConfirmButton: false,
                    timer: 1500,
                });
                carregarFornecedores();
            });
            return;
        };

        fornecedoresService.saveFornecedor(fornecedor).then(() => {
            delete $scope.fornecedor;
            $scope.fornecedorForm.$setPristine();
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Fornecedor criado com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => carregarFornecedores());
        });
    };

    const excluirFornecedor = id => {
        Swal.fire({
            title: 'Tem certeza que deseja deletar esse Fornecedor?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Deletar'
        }).then((result) => {
            if (result.isConfirmed) {
                fornecedoresService.deleteFornecedor(id);
                Swal.fire(
                    'Deletado!',
                    '',
                    'success'
                ).then(() => carregarFornecedores());
            }
        });
    };

    const ordenarPor = campo => {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarFornecedores();

    $scope.consultCep = consultCep;
    $scope.submit = submit;
    $scope.excluirFornecedor = excluirFornecedor;
    $scope.editarFornecedor = editarFornecedor;
    $scope.ordenarPor = ordenarPor;
});