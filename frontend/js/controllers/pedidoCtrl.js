angular.module("fornecedores").controller("pedidoCtrl", function ($scope, pedidosService, config, fornecedoresService, produtosService, $location) {
    $scope.app = "Pedidos"
    $scope.pedidos = [];
    $scope.fornecedores = [];
    $scope.produtos = [];
    $scope.situacoes = ['Finalizado', 'Cancelado'];
    $scope.form = {
        fornecedor_id: null,
        produto_id: [],
    };

    const init = () => {
        carregarPedidos();
        carregarFornecedores();
        carregarProdutos();
    };

    const carregarProdutos = () => {
        produtosService.getProdutos().then(resp => {
            $scope.produtos = resp.data;
        });
    };

    const carregarFornecedores = () => {
        fornecedoresService.getFornecedores().then(resp => {
            $scope.fornecedores = resp.data;
        });
    };

    const carregarPedidos = () => {
        pedidosService.getPedidos().then(resp => {
            $scope.pedidos = resp.data.map(pedido => {
                pedido.pdf_url = `${config.baseUrl}/pdf/${pedido.id}`;

                return pedido;
            });
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

    const submitCreate = () => {
        $scope.form.produto_id = $scope.produtos.filter(prod => prod.selected).map(prod => prod.id);

        if (!$scope.form.produto_id.length) {
            alert('Selecione Algum Produto');
            return;
        }

        if (!$scope.form.fornecedor_id) {
            alert('Selecione Algum Fornecedor');
            return;
        }

        pedidosService.savePedido($scope.form).then(() => {
            resetForm();
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Pedido criado com sucesso',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                $location.path('/pedidos');
                carregarPedidos();
            });
        });
    };

    const resetForm = () => {
        $scope.form = {
            fornecedor_id: null,
            produto_id: [],
        };
        $scope.produtos.forEach(prod => prod.selected = false);
    }

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

    init();

    $scope.editarPedido = editarPedido;
    $scope.submitCreate = submitCreate;
    $scope.excluirPedido = excluirPedido;
    $scope.ordenarPor = ordenarPor;
});