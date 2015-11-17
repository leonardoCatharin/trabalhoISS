'use strict';

  require('./app/login/module');
  require('./app/produto/module');
  require('./app/cliente/module');
  require('./app/funcionario/module');
  require('./app/venda/module');
  require('./app/pedidodecompra/module');
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
    , 'app.pedidocompra'
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

}])
.factory('seed',function(){
  return {
    'produtos': [
      {name: 'Bolacha turma da mônica', id: ~~Math.random()*100000, value: 5.99},
      {name: 'Negresco', id: ~~Math.random()*100000, value: 2.99},
      {name: 'Coxinha de Frango', id: ~~Math.random()*100000, value: 3.50},
      {name: 'Arroz 5kg', id: ~~Math.random()*100000, value: 12.00},
      {name: 'Kibe', id: ~~Math.random()*100000, value: 3.50},
      {name: 'Suco de Laranja Purity', id: ~~Math.random()*100000, value: 4.00},
      {name: 'Farinha 5k Tio João', id: ~~Math.random()*100000, value: 8.00},
    ],
    'clientes': [
      {name: 'João', sobrenome: 'Silva', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-3333',cel: '(44) 9871-2325'},
      {name: 'Tião', sobrenome: 'Carreiro', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-2231',cel: '(44) 9871-0922'},
      {name: 'Maria', sobrenome: 'dos Santos', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-6442',cel: '(44) 9871-2376'},
      {name: 'Lucas', sobrenome: 'Amaral', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-1232',cel: '(44) 9871-2253'},
      {name: 'Geninha', sobrenome: 'Bialin', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-2222',cel: '(44) 9871-2399'},
    ],
    'funcionarios': [
      {name: 'Marcos',endereco: 'Rua São Jorge, 67', sobrenome: 'Valério', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-3123',cel: '(44) 9871-9587',funcao: 'Vendedor'},
      {name: 'Mateus',endereco: 'Rua São Lucas, 167', sobrenome: 'Jorge', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-1235',cel: '(44) 9871-4678',funcao: 'Padeiro'},
      {name: 'Julio',endereco: 'Rua de Todos os Santos, 12a', sobrenome: 'Freitas', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-3612',cel: '(44) 9871-4568',funcao: 'Caixa'},
      {name: 'Marta',endereco: 'Rua Presidente Lula da Dlma, Apto 602', sobrenome: 'Genesis', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-7234',cel: '(44) 9871-3456',funcao: 'Repositor'},
      {name: 'Márcia',endereco: 'Rua São Jorge, 87', sobrenome: 'de Lucca', idade: ~~(Math.random()*60)+18,fixo: '(44) 3305-1223',cel: '(44) 9871-9835',funcao: 'Vendedor'},
    ]
  }
});
