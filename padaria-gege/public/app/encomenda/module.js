'use strict';

angular.module('app.encomenda', ['ui.router'])
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
                 controller: 'EncomendaFormController'
                
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
            console.log(id);
            $state.go('encomenda.editar',{id:id});
        }
    }])
    .controller('EncomendaFormController', ['$scope','$state','EncomendaService','entity',function ($scope,$state,EncomendaService, entity) {
        $scope.entity = entity || {};
        $scope.save = function(entity){
            if(entity._id == null){
                entity.dataSolicitacao = new Date();
                entity.horaEntrega = $scope.horaEntrega.toString();
                EncomendaService.save(entity).then(function(data){
                    $state.go('encomenda.lista');
                })
            }else{
                entity.horaEntrega = $scope.horaEntrega.toString();
                EncomendaService.update(entity).then(function(data){
                    $state.go('encomenda.lista');
                })
            }
        }

        $scope.remover = function(index){
            $scope.valores.splice(index,1);
        }

        $scope.add = function(obj){
            $scope.valores.push(obj);
            $scope.produto = {valor:''}
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
    }])
    // .controller('EncomendaEditarController', ['$scope','seed',function ($scope,seed) {
    //     $scope.opts = [
    //         'EM PRODUÇÃO',
    //         'FINALIZADO',
    //         'ENTREGUE'
    //     ];

    //     $scope.remover = function(index){
    //         $scope.valores.splice(index,1);
    //     }

    //     $scope.add = function(obj){
    //         $scope.valores.push(obj);
    //         $scope.produto = {valor:''}
    //     }
    // }])

    .service('EncomendaService',['$http',function($http){
        var url = 'http://localhost:8000/api/encomenda';
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
