'use strict';

angular.module('app.ordemProducao', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('ordemProducao.lista', {
                url: "/lista"
                ,templateUrl: 'app/ordemproducao/lista.html'
                ,controller:'ordemProducaoListaController'
            })
            .state('ordemProducao.novo', {
                 url: "/novo",
                 templateUrl: 'app/ordemproducao/form.html',
                 controller: 'ordemProducaoFormController',
                 resolve: {
                   entity: function(){
                     return {};
                   }
                 }
            })
            .state('ordemProducao.editar', { // isso é um estado
                url: "/:id"// isso  é uma rota
                , templateUrl: 'app/ordemproducao/form.html'
                , controller: 'ordemProducaoFormController'
                , resolve:  {
                    entity:['ordemProducaoService','$stateParams',function(ordemProducao,$stateParams){
                        return ordemProducaoService.getById($stateParams.id).then(function(data){
                            return data.data;
                        })
                    }]
                }
            });
    }])
    .controller('ordemProducaoListaController', ['$scope','$state','ordemProducaoService',function ($scope,$state,ordemProducaoService) {
        function getDados(){
            ordemProducaoService.get().then(function(data){
                $scope.ordensProducao = data.data;
            })
        }
        getDados();

        $scope.remover = function(id){// tudo q esta no scopo esta no html
            ordemProducaoService.remove(id).then(function(data){
                getDados();
            })
        }

        $scope.alterar = function(id){
            $state.go('ordemProducao.editar',{id:id});
        }
    }])
    .controller('ordemProducaoFormController', ['$scope','$state','ordemProducaoService','entity','ProdutoService',function ($scope,$state,ordemProducaoService, entity, ProdutoService) {
        $scope.entity = entity;
        $scope.entity.itemProducao = $scope.entity.itemProducao || [];

        $scope.save = function(entity){
            if(entity._id == null){
                entity.dataPrazo = $scope.dataPrazo;
                ordemProducaoService.save(entity).then(function(data){
                    $state.go('ordemProducao.lista');
                },errorResponse)
            }else{
                entity.dataPrazo = $scope.dataPrazo;
                ordemProducaoService.update(entity).then(function(data){
                    $state.go('ordemProducao.lista');
                },errorResponse)
            }
        }
        function errorResponse(data){
            console.log(data)
        }

        $scope.arrTipoOrdens = [
            'INTERNA',
            'CLIENTE'
        ];
        $scope.entity.tipoOrdem = $scope.arrTipoOrdens[0];

        $scope.entity.dataPrazo = new Date($scope.entity.dataPrazo) || new Date();
        if($scope.entity.dataPrazo !=  null){
            $scope.dataPrazo = new Date($scope.entity.dataPrazo);
        }
      }])
    .service('ordemProducaoService',['$http', function($http){
        var url = window.location.origin+'/api/ordemproducao';
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
