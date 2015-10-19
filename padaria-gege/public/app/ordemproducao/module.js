'use strict';

angular.module('app.ordemproducao', ['ui.router'])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('ordemproducao.lista', {
                url: "/lista"
                , templateUrl: 'ordemproducao/lista.html'
                ,controller:'OrdemProducaoListaController'
            })
            .state('ordemproducao.novo', {
                url: "/novo"
                , templateUrl: 'ordemproducao/form.html'
                , controller: 'OrdemProducaoNovoController'
            })
            .state('ordemproducao.editar', {
                url: "/{id}"
                , templateUrl: 'ordemproducao/form.html'
                , controller: 'OrdemProducaoEditarController'
            });
    }])
    .controller('OrdemProducaoNovoController', ['$scope','seed',function ($scope,seed) {
        $scope.opts = [
            'MATÉRIA-PRIMA'
            , 'REVENDA'
            , 'MANUFATURA'
        ]
        $scope.produtos = seed.produtos;
        $scope.valores = [];
        $scope.produto = {
            valor:''
        }
        $scope.add = function(value){
            $scope.valores.push(value);
            $scope.produto = {
                valor:''
            }
        }
        $scope.remover = function(index){
            $scope.valores.splice(index,1);
        }
    }])
    .controller('OrdemProducaoEditarController', ['$scope','seed',function ($scope,seed) {
        $scope.opts = [
            'MATÉRIA-PRIMA'
            , 'REVENDA'
            , 'MANUFATURA'
        ]
        $scope.produtos = seed.produtos;
        $scope.valores = [];
        $scope.produto = {
            valor:''
        }
        $scope.add = function(value){
            $scope.valores.push(value);
            $scope.produto = {
                valor:''
            }
        }
        $scope.remover = function(index){
            $scope.valores.splice(index,1);
        }
    }]);
