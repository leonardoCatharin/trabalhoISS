'use strict';
angular.module('app.fornecedor', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('fornecedor.lista', {
        url: "/lista",
        templateUrl: './app/fornecedor/lista.html',
        controller: 'FornecedorListaController'
      })
      .state('fornecedor.novo', {
        url: "/novo",
        templateUrl: './app/fornecedor/form.html',
        controller: 'FornecedorFormController',
        resolve: {
          entity: function() {
            return {
              "nome": null,
              "responsavel": null,
              "email": null,
              "endereco": null,
              "name": null,
              "telefone": null
            };
          }
        }
      })
      .state('fornecedor.editar', {
        url: "/:id",
        templateUrl: 'app/fornecedor/form.html',
        controller: 'FornecedorFormController',
        resolve: {
          entity: ['FornecedorService', '$stateParams', function(FornecedorService, $stateParams) {
            return FornecedorService
              .getId($stateParams.id)
              .then(function(data) {
                return data;
              })
          }]
        }
      });
  }])
  .service('FornecedorService', ['$http', function($http) {
    this.get = get;
    this.getId = getId;
    this.update = update;
    this.save = save;
    this.remove = remove;
    this.getByName = getByName;

    function get(page) {
      return $http.get('/api/fornecedor', page).then(function(data) {
        return data.data;
      });
    }

    function getId(id) {
      return $http.get('/api/fornecedor/' + id).then(function(data) {
        console.log(data)
        return data.data;
      });
    }

    function getByName(nome) {
      return $http.get('/api/fornecedor/name', {
          params: {
            nome
          }
        })
        .then(function(data) {
          return data.data;
        });
    }

    function update(val) {
      return $http.put('/api/fornecedor/' + val._id, val);
    }

    function save(val) {
      return $http.post('/api/fornecedor', val);
    }

    function remove(id) {
      return $http.delete('/api/fornecedor/' + id);
    }

  }])
  .controller('FornecedorListaController', ['$scope', '$state', 'FornecedorService', function($scope, $state, FornecedorService) {

    $scope.get = function(page) {
      FornecedorService.get(0)
        .then(data => {
          $scope.list = data;
        })
    }

    $scope.remover = function(id) {
      FornecedorService
        .remove(id)
        .then(data => {
          $scope.get(0);
        })
    }

    $scope.alterar = function(value) {
      $state.go('fornecedor.editar', {
        id: value._id
      });
    }

    $scope.get(0);

  }])
  .controller('FornecedorFormController', ['$scope', 'entity', '$state', 'FornecedorService', function($scope, entity, $state, FornecedorService) {
    $scope.entity = entity || {};
    $scope.saveOrUpdate = saveOrUpdate;

    function saveOrUpdate(val) {
      let promise;
      promise = val._id ? FornecedorService.update(val) : FornecedorService.save(val);
      promise.then(function(data) {
        if (data.status == 200) $state.go('fornecedor.lista');
      })
    }
  }]);
