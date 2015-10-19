'use strict';
angular.module('app.produto', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('produto.lista', {
                url: "/lista"
                , templateUrl: 'produto/lista.html'
                ,controller:'ProdutoListaController'
            })
            .state('produto.novo', {
                url: "/novo"
                , templateUrl: 'produto/form.html'
                , controller: 'ProdutoNovoController'
            })

            .state('produto.emfalta', {
                url: "/falta"
                , templateUrl: 'produto/lista.html'
                , controller: 'ProdutoEmFaltaController'
            })
            .state('produto.editar', {
                url: "/:id"
                , templateUrl: 'produto/form.html'
                , controller: 'ProdutoEditarController'
            });
    }])
    .controller('ProdutoListaController', ['$scope','$state',function ($scope,$state) {
        $scope.valores=[
            {
                nome:'Bolacha Passatempo'
                ,tipo:'REVENDA'
                ,valor: 12.50
                ,qntdMin: 3
            }
        ]

        $scope.remover = function(index){
            $scope.valores.splice(index,1);
        }

        $scope.alterar = function(index){
            $state.go('produto.editar',{id:index});
        }
    }])
    .controller('ProdutoNovoController', ['$scope',function ($scope) {
        $scope.opts = [
            'MATÉRIA-PRIMA'
            , 'REVENDA'
            , 'MANUFATURA'
        ];
        $scope.entity = {min:0}
    }])
    .controller('ProdutoEditarController', ['$scope',function ($scope) {
        $scope.opts = [
            'MATÉRIA-PRIMA'
            , 'REVENDA'
            , 'MANUFATURA'
        ]

    }])
    .controller('ProdutoEmFaltaController', ['$scope','$state',function ($scope,$state) {
        $scope.in = true;
        $scope.valores=[
            {
                nome:'Farinha Aviação'
                ,tipo:'MATERIA PRIMA'
                ,valor: 12.50
                ,qntdMin: 3
            }
        ]
        $scope.remover = function(index){
            $scope.valores.splice(index,1);
        }
        $scope.alterar = function(index){
            $state.go('produto.editar',{id:index});
        }
    }]);
