'use strict';

angular.module('app.pedidoCompra', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('pedidoCompra.lista', {
                url: "/lista"
                ,templateUrl: 'app/pedidocompra/lista.html'
                ,controller:'pedidoCompraListaController'
            })
            .state('pedidoCompra.novo', {
                 url: "/novo",
                 templateUrl: 'app/pedidocompra/form.html',
                 controller: 'pedidoCompraFormController',
                 resolve: {
                   entity: function(){
                     return {};
                   }
                 }
            })
            .state('pedidoCompra.editar', { // isso é um estado
                url: "/:id"// isso  é uma rota
                , templateUrl: 'app/pedidocompra/form.html'
                , controller: 'pedidoCompraFormController'
                , resolve:  {
                    entity:['pedidoCompraService','$stateParams',function(pedidoCompraService,$stateParams){
                        return pedidoCompraService.getById($stateParams.id).then(function(data){
                            return data.data;
                        })
                    }]
                }
            });
    }])
    .controller('pedidoCompraListaController', ['$scope','$state','pedidoCompraService',function ($scope,$state,pedidoCompraService) {
        function getDados(){
            pedidoCompraService.get().then(function(data){
                $scope.pedidoCompras = data.data;
            })
        }
        getDados();

        $scope.remover = function(id){// tudo q esta no scopo esta no html
            pedidoCompraService.remove(id).then(function(data){
                getDados();
            })
        }

        $scope.alterar = function(id){
          console.log(id);
            $state.go('pedidoCompra.editar',{id:id});
        }
    }])
    .controller('pedidoCompraFormController', ['$scope','$state','pedidoCompraService','entity',function ($scope,$state,pedidoCompraService, entity) {
        $scope.entity = entity;
        $scope.entity.itensPedido = $scope.entity.itensPedido || [];
        $scope.save = function(entity){
            if(entity._id == null){
                entity.dataVencimento = $scope.dataVencimento;
                pedidoCompraService.save(entity).then(function(data){
                    $state.go('pedidoCompra.lista');
                },errorResponse)
            }else{
                entity.dataVencimento = $scope.dataVencimento;
                pedidoCompraService.update(entity).then(function(data){
                    $state.go('pedidoCompra.lista');
                },errorResponse)
            }
        }
        function errorResponse(data){
            console.log(data)
        }

        $scope.remover = function(index){
            console.log($scope.entity.itensPedido);
            $scope.entity.itensPedido.splice(index,1);
        }

        $scope.add = function(obj){
            $scope.entity.itensPedido.push(angular.copy(obj));
            $scope.itemPedidoCompra = {};

        }

        $scope.entity.dataVencimento = new Date($scope.entity.dataVencimento) || new Date();
        if($scope.entity.dataVencimento !=  null){
            $scope.dataVencimento = new Date($scope.entity.dataVencimento);
        }
      }])
    .service('pedidoCompraService',['$http', function($http){
        var url = window.location.origin+'/api/pedidocompra';
        this.get = function(page, size){
            return $http.get(url);
        }
        this.getById = function(id){
            return $http.get(url+'/'+id);
        }
        this.save = function(entity){
            return $http.post(url,entity);
        }
        this.update = function(entity){
            return $http.put(url+'/'+entity._id,entity);
        }
        this.remove = function(id){
            return $http.delete(url+'/'+id);
        }
    }]);