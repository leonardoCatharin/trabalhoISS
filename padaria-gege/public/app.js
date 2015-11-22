'use strict';

  require('./app/login/module');
  require('./app/produto/module');
  require('./app/cliente/module');
  require('./app/funcionario/module');
  require('./app/venda/module');
  require('./app/pedidocompra/module');
  require('./app/ordemproducao/module');
  require('./app/relatorio/module');
  require('./app/entrega/module');
  require('./app/encomenda/module');
  require('./app/usuario/module');

angular.module('myApp', [
    'ui.router'
    , 'ui.utils.masks'
    , 'app.login'
    , 'app.produto'
    , 'app.cliente'
    , 'app.funcionario'
    , 'app.venda'
    , 'app.pedidoCompra'
    , 'app.ordemProducao'
    , 'app.relatorio'
    , 'app.entrega'
    , 'app.encomenda'
    , 'app.usuario'

]).config(['$stateProvider', '$urlRouterProvider',($stateProvider, $urlRouterProvider, $httpProvider) => {
    $urlRouterProvider.otherwise("/produto");
    $stateProvider
        .state('produto', {
            url: "/produto"
            ,templateUrl:'base.html'
        })
        .state('cliente', {
            url: "/cliente"
            ,templateUrl:'base.html'
        })
        .state('funcionario', {
            url: "/funcionario"
            ,templateUrl:'base.html'
        })
        .state('venda', {
            url: "/venda"
            ,templateUrl:'base.html'
        })
        .state('pedidoCompra', {
            url: "/pedidoCompra"
            ,templateUrl:'base.html'
        })
        .state('ordemProducao', {
            url: "/ordemproducao"
            ,templateUrl:'base.html'
        })
        .state('relatorio', {
            url: "/relatorio"
            ,templateUrl:'base.html'
        })
        .state('entrega', {
            url: "/entrega"
            ,templateUrl:'base.html'
        })
        .state('encomenda', {
            url: "/encomenda"
            ,templateUrl:'base.html'
        })
        .state('usuario', {
            url: "/usuario"
            ,templateUrl:'base.html'
        });

    $httpProvider.interceptors.push(($q, $injector, $window) => {
        return {
            'request': function (config) {
                config.headers['x-access-token'] = $window.sessionStorage['token'] || 0;
                return config;
            },
            'response': function (config) {
                return config;
            },
            'responseError': function (rejection) {
                if (rejection.status === 403) {
                    var state = $injector.get('$state');
                    state.go('login.log');
                }
                return $q.reject(rejection);
            }
        };
    })

}]);