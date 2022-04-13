angular.module("fornecedores").controller("produtoCtrl", function ($scope, produtosService) {
    $scope.app = "Produtos";
    $scope.msg = 'Adicionar';

    const carregarProdutos = () => {
        produtosService.getProdutos().then(resp => {
            $scope.produtos = resp.data;
        }).catch(() => {
            $scope.error = "Não foi possível carregar os dados!";
        });
    };

    const editarProduto = id => {
        produtosService.selectProduto(id).then(resp => {
            $scope.msg = 'Editar';
            $scope.produto = resp.data;
        });
    };

    const submit = (produto, id) => {
        if (id) {
            produtosService.editProduto(id, produto).then(() => {
                delete $scope.produto;
                $scope.produtoForm.$setPristine();
                $scope.msg = 'Adicionar'
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Produto atualizado com sucesso',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => carregarProdutos());
            });
            return;
        };

        produtosService.saveProduto(produto).then(() => {
            delete $scope.produto;
            $scope.produtoForm.$setPristine();
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Produto criado com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => carregarProdutos());
        });
    };

    const excluirProduto = id => {
        Swal.fire({
            title: 'Tem certeza que deseja deletar esse Produto?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Deletar'
        }).then(result => {
            if (result.isConfirmed) {
                produtosService.deleteProduto(id);
                Swal.fire(
                    'Deletado!',
                    '',
                    'success'
                ).then(() => carregarProdutos());
            }
        });
    };

    const ordenarPor = campo => {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarProdutos();

    $scope.submit = submit;
    $scope.excluirProduto = excluirProduto;
    $scope.editarProduto = editarProduto;
    $scope.ordenarPor = ordenarPor;
});