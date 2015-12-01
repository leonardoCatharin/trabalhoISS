'use strict';

angular.module('app.relatorio', ['ui.router'])
    .config(['$stateProvider',function ($stateProvider) {
        $stateProvider
            .state('relatorio.lista', {
                url: "/lista"
                , templateUrl: 'relatorio/lista.html'
                ,controller:'RelatorioListaController'
            })
    }])
    .controller('RelatorioListaController', ['$scope',function ($scope) {
            $scope.options = [
            'Geral',
            'Despesa',
            'Lucro',
            'Folha Salarial'
            ]
            $scope.select = 'Geral';
        $scope.isAble = function(){
            if($scope.select == 'Folha Salarial'){
                return $scope.inicio;
            }else if($scope.select != ''){
                return $scope.inicio && $scope.fim;
            }
        }
    }])
