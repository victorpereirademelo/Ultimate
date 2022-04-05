angular.module("fornecedores").controller("pedidoCtrl", function ($scope, pedidosService) {
    $scope.app = "Pedidos";
    $scope.pedidos = [];
    $scope.situacoes = ['Aberto', 'Finalizado', 'Cancelado'];

    const carregarPedidos = () => {
        pedidosService.getPedidos().then(resp => {
            $scope.pedidos = resp.data;
        }).catch(() => {
            $scope.error = "Não foi possível carregar os dados!";
        });
    };

    const editarPedido = id => {
        $scope.submitUpdate = pedido => {
            pedidosService.editPedido(id, pedido).then(() => {
                delete $scope.pedido;
                $scope.pedidoForm.$setPristine();
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Pedido atualizado com sucesso',
                    showConfirmButton: false,
                    timer: 1500,
                });
                carregarPedidos();
            });
        };
    };

    // $scope.submitCreate = produto => {
    //     produtosService.saveProduto(produto).then(() => {
    //         delete $scope.produto;
    //         $scope.produtoForm.$setPristine();
    //         Swal.fire({
    //             position: 'top-center',
    //             icon: 'success',
    //             title: 'Produto criado com sucesso',
    //             showConfirmButton: false,
    //             timer: 1500
    //         }).then(() => carregarPedidos());
    //     });
    // };

    const excluirPedido = id => {
        Swal.fire({
            title: 'Tem certeza que deseja deletar esse Pedido?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Deletar'
        }).then((result) => {
            if (result.isConfirmed) {
                pedidosService.deletePedido(id);
                Swal.fire(
                    'Deletado!',
                    '',
                    'success'
                ).then(() => carregarPedidos());
            }
        });
    };

    const ordenarPor = campo => {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarPedidos();

    $scope.excluirPedido = excluirPedido;
    $scope.editarPedido = editarPedido;
    $scope.ordenarPor = ordenarPor;
});