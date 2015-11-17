'use strict';
console.log('asdasdas')
angular.module('app.usuario', ['ui.router'])
    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state('usuario.lista', {
                url: "/lista"
                , templateUrl: 'app/usuario/lista.html'
                ,controller:'UsuarioListaController'
            })
            .state('usuario.novo', {
                url: "/novo"
                , templateUrl: 'app/usuario/form.html'
                , controller: 'UsuarioFormController'
                , resolve: {
                    entity: function(){
                        return {};
                    }
                }
            })
            .state('usuario.editar', {
                url: "/{id}"
                , templateUrl: 'app/usuario/form.html'
                , controller: 'UsuarioFormController'
                , resolve: {
                    entity:['UsuarioService','$stateParams',function(UsuarioService,$stateParams){
                        return UsuarioService.getById($stateParams.id).then(function(data){
                            return data.data;
                        })
                    }]
                }
            });
    }])
    .controller('UsuarioListaController', ['$scope','$state','UsuarioService',function ($scope,$state,UsuarioService) {
        function getDados(){
            UsuarioService.get().then(function(data){
                $scope.usuarios = data.data;
            })
        }
        getDados();
        $scope.remover = function(id){
            UsuarioService.remove(id).then(function(data){
                getDados();
            })
        }
        $scope.alterar = function(index){
            $state.go('usuario.editar',{id:index})
        }
    }])
    .controller('UsuarioFormController', ['$scope','UsuarioService','$state', 'entity',function ($scope,UsuarioService,$state,entity) {
        $scope.entity = entity;
        $scope.tipos = [
            'VENDA'
            , 'PRODUCAO'
            , 'ENCOMENDA'
            , 'ESTOQUE'
            , 'ENTREGA'
            , 'GERENCIA'
          ]
        $scope.save = function(entity){
            if(!entity._id){
                UsuarioService.save(entity).then(resolveSaveUpdate)
            }else{
                UsuarioService.update(entity).then(resolveSaveUpdate)
            }
        }
        function resolveSaveUpdate(){
            $state.go('usuario.lista');
        }
    }])
    .service('UsuarioService',['$http',function($http){
        var url = 'http://localhost:8000/api/usuario';
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
