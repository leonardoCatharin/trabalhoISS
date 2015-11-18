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
    , 'app.ordemproducao'
    , 'app.relatorio'
    , 'app.entrega'
    , 'app.encomenda'
    , 'app.usuario'

]).config(['$stateProvider', '$urlRouterProvider',($stateProvider, $urlRouterProvider) => {
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
        .state('pedidocompra', {
            url: "/pedidocompra"
            ,templateUrl:'base.html'
        })
        .state('ordemproducao', {
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

}]);