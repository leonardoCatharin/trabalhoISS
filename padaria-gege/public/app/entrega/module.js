'use strict';

angular.module('app.entrega', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('entrega.lista', {
                url: "/lista"
                , templateUrl: 'entrega/lista.html'
                ,controller:'EntregaListaController'
            })
            .state('entrega.edit', {
                url: "/{id}"
                , templateUrl: 'entrega/form.html'
                ,controller:'EntregaEditarController'
            })
    }])
    .controller('EntregaListaController', ['$scope',function ($scope) {
        $scope.data = new Date();
    }])
