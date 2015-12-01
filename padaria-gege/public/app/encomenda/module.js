'use strict';

angular.module('app.encomenda', ['ui.router','app.produto'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('encomenda.lista', {
                url: "/lista"
                ,templateUrl: 'app/encomenda/lista.html'
                ,controller:'EncomendaListaController'
            })
            .state('encomenda.novo', {
                 url: "/novo",
                 templateUrl: 'app/encomenda/form.html',
                 controller: 'EncomendaFormController',
                 resolve: {
                   entity: function(){
                     return {};
                   }
                 }
            })
            .state('encomenda.editar', { // isso é um estado
                url: "/:id"// isso  é uma rota
                , templateUrl: 'app/encomenda/form.html'
                , controller: 'EncomendaFormController'
                , resolve:  {
                    entity:['EncomendaService','$stateParams',function(EncomendaService,$stateParams){
                        return EncomendaService.getById($stateParams.id).then(function(data){
                            return data.data;
                        })
                    }]
                }
            });
    }])
    .controller('EncomendaListaController', ['$scope','$state','EncomendaService',function ($scope,$state,EncomendaService) {
        function getDados(){
            EncomendaService.get().then(function(data){
                $scope.encomendas = data.data;
            })
        }
        getDados();

        $scope.remover = function(id){// tudo q esta no scopo esta no html
            EncomendaService.remove(id).then(function(data){
                getDados();
            })
        }

        $scope.alterar = function(id){
            $state.go('encomenda.editar',{id:id});
        }
    }])
    .controller('EncomendaFormController', ['$scope','$state','EncomendaService','entity','ProdutoService',function ($scope,$state,EncomendaService, entity, ProdutoService) {
        $scope.entity = entity;
        $scope.entity.produtos = $scope.entity.produtos || [];
        $scope.save = function(entity){
            console.log(entity)
                entity.horaEntrega = $scope.horaEntrega;
                entity.dataEntrega = $scope.dataEntrega;
            if(entity._id == null){
                entity.dataSolicitacao = new Date();
                EncomendaService.save(entity).then(function(data){
                    $state.go('encomenda.lista');
                },errorResponse)
            }else{
                EncomendaService.update(entity).then(function(data){
                    $state.go('encomenda.lista');
                },errorResponse)
            }
        }
        function errorResponse(data){
            console.log(data)
        }

        $scope.searchProduct = function(param){
            return ProdutoService.getByName(param).then(function(data){
                return data;
            })
        };

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
        if($scope.entity.horaEntrega !=  null){
            $scope.horaEntrega = new Date($scope.entity.horaEntrega);
        }
        if($scope.entity.dataEntrega !=  null){
            $scope.dataEntrega = new Date($scope.entity.dataEntrega);
        }
      }])
    .service('EncomendaService',['$http', function($http){
        var url = window.location.origin+'/api/encomenda';
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
