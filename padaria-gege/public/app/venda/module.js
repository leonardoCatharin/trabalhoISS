'use strict';
angular.module('app.venda', ['ui.router','ui.bootstrap'])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('venda.lista', {
                url: "/lista"
                , templateUrl: 'venda/list.html'
                ,controller:'VendaController'
            })
    }])
    .controller('VendaController', ['$scope','$modal', function ($scope,$modal) {
      $scope.sales = [];
      $scope.getPrecos = function(v){
        return v.vendas.reduce(function(prev,next){
          return prev += (next.number * next.product.value);
        },0)
      }

        $scope.open = function(){
          var modalInstance = $modal.open({
            animation: true,
            backdrop: false,
            templateUrl: 'modaltemplate.html',
            controller: 'ModalController',
            size: 'md'
          })
          modalInstance.result.then(function(value){
            $scope.sales.push(value);
          })
        }
    }])
    .controller('ModalController',['$scope','$modalInstance','seed',function($scope,$modalInstance,seed){
      $scope.products = seed.produtos;
      $scope.clientes = seed.clientes;
      $scope.addedProducts = [];
      $scope.add = function(obj){
        $scope.addedProducts.push(angular.copy(obj));
        $scope.sale.number = 0;
        $scope.sale.item = $scope.products[0];
      }

      $scope.close = function(_boolean){
        if(_boolean){
           $modalInstance.close({
             cliente: $scope.cliente,
             vendas: $scope.addedProducts
           });
           return 0;
        }
       $modalInstance.dismiss();
      }
    }])
