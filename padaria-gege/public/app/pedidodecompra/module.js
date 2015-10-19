'use strict';

angular.module('app.pedidocompra', ['ui.router'])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('pedidocompra.novo', {
                url: "/novo"
                , templateUrl: 'pedidodecompra/form.html'
                , controller: 'PedidoCompraNovoController'
            })
    }])
    .controller('PedidoCompraNovoController', ['$scope','seed',function ($scope,seed) {
        $scope.produtos = seed.produtos;
        $scope.valores = [];
        $scope.add = function(value){
            $scope.valores.push(value);
        }
        $scope.remover = function(value){
            $scope.valores.push(value);
        }
    }])
