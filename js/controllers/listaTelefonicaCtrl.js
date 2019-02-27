angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatos, operadoras, serialGenerator) {
    $scope.app = "Lista Telefonica";
    $scope.contatos = contatos.data;
    $scope.operadoras = operadoras.data;

    var generateSerial = function (contatos) {
        contatos.forEach(function (item) {
            item.serial = serialGenerator.generate();
        });
    }

    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        //$scope.contatos.push(angular.copy(contato))
        contatosAPI.saveContato(contato).then(function (response) {
            delete $scope.contato;
            // resetando o estado do formulario para nunca tocado
            $scope.contatoForm.$setPristine();
            carregarContatos();
        }, function (error) {
            $scope.message = "Contato não salvo: " + response.data;
        });
    };

    $scope.apagarContato = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado)
                return contato;
        });
    };

    //Se um dos contatos for true, a funcao some returna true
    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };

    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    generateSerial($scope.contatos);

});