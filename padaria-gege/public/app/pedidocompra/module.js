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
        $scope.entity.produtos = $scope.entity.produtos || [];
        $scope.save = function(entity){
            if(entity._id == null){
                entity.dataSolicitacao = new Date();
                entity.horaEntrega = $scope.horaEntrega.toString();
                entity.dataEntrega = $scope.dataEntrega;
                pedidoCompraService.save(entity).then(function(data){
                    $state.go('pedidoCompra.lista');
                },errorResponse)
            }else{
                alert("teste");
                entity.horaEntrega = $scope.horaEntrega.toString();
                entity.dataEntrega = $scope.dataEntrega;
                pedidoCompraService.update(entity).then(function(data){
                    $state.go('pedidoCompra.lista');
                },errorResponse)
            }
        }
        function errorResponse(data){
            console.log(data)
        }

        $scope.remover = function(index){
            $scope.entity.produtos.splice(index,1);
        }

        $scope.add = function(obj){
            $scope.entity.produtos.push(angular.copy(obj));
            $scope.produto = {};

        }

        $scope.arrStatus = [
            'EM PRODUÇÃO',
            'FINALIZADO',
            'ENTREGUE'
        ];

        $scope.entity.status = $scope.entity.status || $scope.arrStatus[0];
        $scope.horaEntrega = new Date($scope.entity.horaEntrega) || new Date();
        $scope.entity.dataEntrega = new Date($scope.entity.dataEntrega) || new Date();
        console.log($scope.entity);
        if($scope.entity.horaEntrega !=  null){
            $scope.horaEntrega = new Date($scope.entity.horaEntrega);
        }
        if($scope.entity.dataEntrega !=  null){
            $scope.dataEntrega = new Date($scope.entity.dataEntrega);
        }
      }])
    .service('pedidoCompraService',['$http', function($http){
        var url = 'http://localhost:8000/api/pedidocompra';
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