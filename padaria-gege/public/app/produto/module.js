'use strict';
angular.module('app.produto', ['ui.router'])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('produto.lista', {
        url: "/lista",
        templateUrl: './app/produto/lista.html',
        controller: 'ProdutoListaController'
      })
      .state('produto.novo', {
        url: "/novo",
        templateUrl: './app/produto/form.html',
        controller: 'ProdutoFormController',
        resolve: {
          entity: function() {
            return {
              "type": null,
              "lowestQuantity": null,
              "code": null,
              "value": null,
              "name": null,
              "supplier": null,
              "description": null,
              "actualQuantity": 0
            };
          }
        }
      })
      .state('produto.editar', {
        url: "/:id",
        templateUrl: 'app/produto/form.html',
        controller: 'ProdutoFormController',
        resolve: {
          entity: ['ProdutoService', '$stateParams', function(ProdutoService, $stateParams) {
            return ProdutoService
              .getId($stateParams.id)
              .then(function(data) {
                return data;
              })
          }]
        }
      });
  }])
  .service('ProdutoService', ['$http', function($http) {
    this.get        = get;
    this.getMissing = getMissing;
    this.getId      = getId;
    this.update     = update;
    this.save       = save;
    this.remove     = remove;
    this.getByName  = getByName;

    function get(page) {
      return $http.get('/api/produto', page).then(function(data) {
        return data.data;
      });
    }

    function getMissing(page) {
      return $http.get('/api/produto/missing',page).then(function(data) {
        return data.data;
      });
    }

    function getId(id) {
      return $http.get('/api/produto/' + id).then(function(data) {
        console.log(data)
        return data.data;
      });
    }

    function getByName(name) {
      return $http.get('/api/produto/name', {
        params: {
          name: name
        }
      }).then(function(data) {
        return data.data;
      });
    }

    function update(val) {
      return $http.put('/api/produto/' + val._id, val);
    }

    function save(val) {
      return $http.post('/api/produto', val);
    }

    function remove(id) {
      return $http.delete('/api/produto/' + id);
    }

  }])
  .controller('ProdutoListaController', ['$scope', '$state', 'ProdutoService', function($scope, $state, ProdutoService) {


    $scope.get = function(page) {
      ProdutoService.get(0)
        .then(data => {
          $scope.list = data;
        })
    }

    $scope.getMissing = function(page) {
      ProdutoService.getMissing(0)
        .then(data => {
          $scope.missingList = data;
        })
    }

    $scope.remover = function(id) {
      ProdutoService
        .remove(id)
        .then(data => {
          $scope.get(0);
        })
    }

    $scope.alterar = function(value) {
      $state.go('produto.editar', {
        id: value._id
      });
    }

    $scope.get(0);
    $scope.getMissing(0);
  }])
  .controller('ProdutoFormController', ['$scope', 'entity', '$state', 'ProdutoService', function($scope, entity, $state, ProdutoService) {
    $scope.entity = entity || {};
    $scope.opts = ['MATERIA-PRIMA', 'REVENDA', 'MANUFATURADO']
    $scope.saveOrUpdate = saveOrUpdate;

    function saveOrUpdate(val) {
      let promise;
      promise = val._id ? ProdutoService.update(val) : ProdutoService.save(val);
      promise.then(function(data) {
        if (data.status == 200) $state.go('produto.lista');
      })
    }
  }])
  .controller('ProdutoEmFaltaController', ['$scope', '$state', function($scope, $state) {
    $scope.in = true;
    $scope.valores = [{
      nome: 'Farinha Aviação',
      tipo: 'MATERIA PRIMA',
      valor: 12.50,
      qntdMin: 3
    }]
    $scope.remover = function(index) {
      $scope.valores.splice(index, 1);
    }
    $scope.alterar = function(index) {
      $state.go('produto.editar', {
        id: index
      });
    }
  }]);
