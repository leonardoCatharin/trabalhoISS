'use strict';

angular.module('app.encomenda', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('encomenda.lista', {
                url: "/lista"
                , templateUrl: 'encomenda/lista.html'
                ,controller:'EncomendaListaController'
            })
            .state('encomenda.novo', {
                url: "/novo"
                , templateUrl: 'encomenda/form.html'
                , controller: 'EncomendaNovoController'
            })
            .state('encomenda.editar', {
                url: "/{id}"
                , templateUrl: 'encomenda/form.html'
                , controller: 'EncomendaEditarController'
            });
    }])
    .controller('EncomendaListaController', ['$scope',function ($scope) {
        $scope.valores = [
            {
                cliente:'Maria'
                ,data:'14/12/2016'
                ,horario:'16:21'
                ,endereco:'Av Brasil, 123'
                ,quantidade:123
            }
        ]

    }])
    .controller('EncomendaNovoController', ['$scope','seed',function ($scope,seed) {
        $scope.opts = [
            'MATÉRIA-PRIMA'
            , 'REVENDA'
            , 'MANUFATURA'
        ]
        $scope.produtos = seed.produtos;
        $scope.clientes = seed.clientes;
        $scope.entity = {cliente:''};
        $scope.valores = [];


        $scope.remover = function(index){
            $scope.valores.splice(index,1);
        }

        $scope.add = function(obj){
            $scope.valores.push(obj);
            $scope.produto = {valor:''}
        }
    }])
    .controller('EncomendaEditarController', ['$scope','seed',function ($scope,seed) {
        $scope.opts = [
            'MATÉRIA-PRIMA'
            , 'REVENDA'
            , 'MANUFATURA'
        ];
        $scope.produtos = seed.produtos;
        $scope.clientes = seed.clientes;
        $scope.valores = [];
        $scope.entity = {cliente:''};

        $scope.remover = function(index){
            $scope.valores.splice(index,1);
        }

        $scope.add = function(obj){
            $scope.valores.push(obj);
            $scope.produto = {valor:''}
        }
    }]);
