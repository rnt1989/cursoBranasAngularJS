angular.module("listaTelefonica").controller("novoContatoCtrl", function ($scope, $location, contatosAPI, serialGenerator, operadoras) {
    $scope.operadoras = operadoras.data;
    
    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        //$scope.contatos.push(angular.copy(contato))
        contatosAPI.saveContato(contato).then(function (response) {
            delete $scope.contato;
            // resetando o estado do formulario para nunca tocado
            $scope.contatoForm.$setPristine();
            $location.path("/contatos");
        }, function (error) {
            $scope.message = "Contato não salvo: " + response.data;
        });
    };
});