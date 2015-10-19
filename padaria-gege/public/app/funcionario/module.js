'use strict';

angular.module('app.funcionario', ['ui.router'])
    .config(["$stateProvider" ,function ($stateProvider) {
        $stateProvider
            .state('funcionario.lista', {
                url: "/lista"
                , templateUrl: 'funcionario/lista.html'
                , controller: 'FuncionarioListaController'
            })
            .state('funcionario.novo', {
                url: "/novo"
                , templateUrl: 'funcionario/form.html'
                , controller: 'FuncionarioNovoController'
            })
            .state('funcionario.entrada', {
                url: "/entrada"
                , templateUrl: 'funcionario/entrada.html'
                , controller: 'FuncionarioEntradaController'
            })
            .state('funcionario.editar', {
                url: "/{id}"
                , templateUrl: 'funcionario/form.html'
                , controller: 'FuncionarioEditarController'
            });
    }])
    .controller('FuncionarioListaController', ['$scope', 'seed', '$state', function ($scope, seed, $state) {
        $scope.funcionarios = seed.funcionarios;
        $scope.alterar = function(index){
            $state.go('funcionario.editar',{id:index});
        }
        $scope.remover = function(index){
            $scope.funcionarios.splice(index,1);
        }
    }])
    .controller('FuncionarioNovoController', ['$scope', function ($scope) {
        $scope.opts = [
            'MATÉRIA-PRIMA'
            , 'REVENDA'
            , 'MANUFATURA'
        ]
    }])
    .controller('FuncionarioEditarController', ['$scope', function ($scope) {
        $scope.opts = [
            'MATÉRIA-PRIMA'
            , 'REVENDA'
            , 'MANUFATURA'
        ]
    }])
    .controller('FuncionarioEntradaController', ['$scope','$state', function ($scope,$state) {
        $scope.opts = [
            'MATÉRIA-PRIMA'
            , 'REVENDA'
            , 'MANUFATURA'
        ];
        $scope.entrada = function(){
            var data = new Date();
            alert('Entrada ou saida em '+ data.getHours()+':'+data.getMinutes());
            $scope.login = '';
            $scope.senha = '';
        }

    }]);
