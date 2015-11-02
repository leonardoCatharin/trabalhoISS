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
                , controller: 'UsuarioNovoController'
            })
            .state('usuario.editar', {
                url: "/{id}"
                , templateUrl: 'app/usuario/form.html'
                , controller: 'UsuarioEditarController'
                , resolve: {
                    entity:['UsuarioService','$stateParams',function(UsuarioService,$stateParams){
                        console.log(UsuarioService,$stateParams.id);
                        return UsuarioService.getById($stateParams.id).then(function(data){
                            console.log(data)
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
    .controller('UsuarioNovoController', ['$scope','UsuarioService','$state',function ($scope,UsuarioService,$state) {
        $scope.entity = {};
        $scope.tipos = [
            'VENDA'
            , 'PRODUCAO'
            , 'ENCOMENDA'
            , 'ESTOQUE'
            , 'ENTREGA'
            , 'GERENCIA'
          ]
        $scope.save = function(entity){
            UsuarioService.save(entity).then(function(data){
                $state.go('usuario.lista');
            })
        }
    }])
    .controller('UsuarioEditarController', ['$scope', 'entity','UsuarioService','$state',function ($scope,entity,UsuarioService,$state) {
        $scope.entity = entity;
        $scope.confsenha = entity.senha;
        $scope.tipos = [
            'VENDA'
            , 'PRODUCAO'
            , 'ENCOMENDA'
            , 'ESTOQUE'
            , 'ENTREGA'
            , 'GERENCIA'
          ]
        $scope.save = function(entity){
            UsuarioService.update(entity).then(function(data){
                $state.go('usuario.lista');
            })
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
