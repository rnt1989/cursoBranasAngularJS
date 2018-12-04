angular.module("listaTelefonica").directive("uiAlert", function () {
    return {
        templateUrl: "view/alert.html",
        replace: true,
        restrict: "E",
        scope: {
            // com @ ele traz o valor do atributo passado
            title: "@",
            // com = ele realiza o binding da variavel do escopo
            message: "="
        },
        transclude: true
    };
});