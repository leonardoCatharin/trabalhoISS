!function t(e,o,r){function n(i,l){if(!o[i]){if(!e[i]){var u="function"==typeof require&&require;if(!l&&u)return u(i,!0);if(a)return a(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var d=o[i]={exports:{}};e[i][0].call(d.exports,function(t){var o=e[i][1][t];return n(o?o:t)},d,d.exports,t,e,o,r)}return o[i].exports}for(var a="function"==typeof require&&require,i=0;i<r.length;i++)n(r[i]);return n}({1:[function(t,e,o){"use strict";t("./app/login/module"),t("./app/produto/module"),t("./app/cliente/module"),t("./app/funcionario/module"),t("./app/venda/module"),t("./app/pedidocompra/module"),t("./app/ordemproducao/module"),t("./app/relatorio/module"),t("./app/entrega/module"),t("./app/encomenda/module"),t("./app/usuario/module"),angular.module("myApp",["ui.router","ui.utils.masks","app.login","app.produto","app.cliente","app.funcionario","app.venda","app.pedidoCompra","app.ordemProducao","app.relatorio","app.entrega","app.encomenda","app.usuario"]).config(["$stateProvider","$urlRouterProvider","$httpProvider",function(t,e,o){e.otherwise("/login"),t.state("produto",{url:"/produto",templateUrl:"base.html"}).state("home",{url:"/home",templateUrl:"base.html"}).state("cliente",{url:"/cliente",templateUrl:"base.html"}).state("funcionario",{url:"/funcionario",templateUrl:"base.html"}).state("venda",{url:"/venda",templateUrl:"base.html"}).state("pedidoCompra",{url:"/pedidoCompra",templateUrl:"base.html"}).state("ordemProducao",{url:"/ordemproducao",templateUrl:"base.html"}).state("relatorio",{url:"/relatorio",templateUrl:"base.html"}).state("entrega",{url:"/entrega",templateUrl:"base.html"}).state("encomenda",{url:"/encomenda",templateUrl:"base.html"}).state("usuario",{url:"/usuario",templateUrl:"base.html"}),o.interceptors.push(["$q","$injector","$window",function(t,e,o){return{request:function(t){return t.headers["x-access-token"]=o.sessionStorage.token||0,console.log(t),t},response:function(t){return console.log(t),t},responseError:function(o){if(console.log(o),403===o.status){var r=e.get("$state");r.go("login.log")}return t.reject(o)}}}])}])},{"./app/cliente/module":2,"./app/encomenda/module":3,"./app/entrega/module":4,"./app/funcionario/module":5,"./app/login/module":6,"./app/ordemproducao/module":7,"./app/pedidocompra/module":8,"./app/produto/module":9,"./app/relatorio/module":10,"./app/usuario/module":11,"./app/venda/module":12}],2:[function(t,e,o){"use strict";angular.module("app.cliente",["ui.router"]).config(["$stateProvider",function(t){t.state("cliente.lista",{url:"/lista",templateUrl:"cliente/lista.html",controller:"ClienteListaController"}).state("cliente.novo",{url:"/novo",templateUrl:"cliente/form.html",controller:"ClienteNovoController"}).state("cliente.editar",{url:"/{id}",templateUrl:"cliente/form.html",controller:"ClienteEditarController"})}]).controller("ClienteListaController",["$scope","seed","$state",function(t,e,o){t.clientes=e.clientes,t.remover=function(e){t.clientes.splice(e,1)},t.alterar=function(t){o.go("cliente.editar",{id:t})}}]).controller("ClienteNovoController",["$scope",function(t){t.opts=["MATÉRIA-PRIMA","REVENDA","MANUFATURA"]}]).controller("ClienteEditarController",["$scope",function(t){t.opts=["MATÉRIA-PRIMA","REVENDA","MANUFATURA"]}])},{}],3:[function(t,e,o){"use strict";angular.module("app.encomenda",["ui.router","app.produto"]).config(["$stateProvider",function(t){t.state("encomenda.lista",{url:"/lista",templateUrl:"app/encomenda/lista.html",controller:"EncomendaListaController"}).state("encomenda.novo",{url:"/novo",templateUrl:"app/encomenda/form.html",controller:"EncomendaFormController",resolve:{entity:function(){return{}}}}).state("encomenda.editar",{url:"/:id",templateUrl:"app/encomenda/form.html",controller:"EncomendaFormController",resolve:{entity:["EncomendaService","$stateParams",function(t,e){return t.getById(e.id).then(function(t){return t.data})}]}})}]).controller("EncomendaListaController",["$scope","$state","EncomendaService",function(t,e,o){function r(){o.get().then(function(e){t.encomendas=e.data})}r(),t.remover=function(t){o.remove(t).then(function(t){r()})},t.alterar=function(t){console.log(t),e.go("encomenda.editar",{id:t})}}]).controller("EncomendaFormController",["$scope","$state","EncomendaService","entity","ProdutoService",function(t,e,o,r,n){function a(t){console.log(t)}t.entity=r,t.entity.produtos=t.entity.produtos||[],t.save=function(r){null==r._id?(r.dataSolicitacao=new Date,r.horaEntrega=t.horaEntrega.toString(),r.dataEntrega=t.dataEntrega,o.save(r).then(function(t){e.go("encomenda.lista")},a)):(alert("teste"),r.horaEntrega=t.horaEntrega.toString(),r.dataEntrega=t.dataEntrega,o.update(r).then(function(t){e.go("encomenda.lista")},a))},t.remover=function(e){t.entity.produtos.splice(e,1)},t.add=function(e){t.entity.produtos.push(angular.copy(e)),t.produto={}},t.arrStatus=["EM PRODUÇÃO","FINALIZADO","ENTREGUE"],t.entity.status=t.entity.status||t.arrStatus[0],t.horaEntrega=new Date(t.entity.horaEntrega)||new Date,t.entity.dataEntrega=new Date(t.entity.dataEntrega)||new Date,console.log(t.entity),null!=t.entity.horaEntrega&&(t.horaEntrega=new Date(t.entity.horaEntrega)),null!=t.entity.dataEntrega&&(t.dataEntrega=new Date(t.entity.dataEntrega))}]).service("EncomendaService",["$http",function(t){var e="http://localhost:8000/api/encomenda";this.get=function(o,r){return t.get(e)},this.getById=function(o){return t.get(e+"/"+o)},this.save=function(o){return t.post(e,o)},this.update=function(o){return t.put(e+"/"+o._id,o)},this.remove=function(o){return t["delete"](e+"/"+o)}}])},{}],4:[function(t,e,o){"use strict";angular.module("app.entrega",["ui.router"]).config(["$stateProvider",function(t){t.state("entrega.lista",{url:"/lista",templateUrl:"entrega/lista.html",controller:"EntregaListaController"}).state("entrega.edit",{url:"/{id}",templateUrl:"entrega/form.html",controller:"EntregaEditarController"})}]).controller("EntregaListaController",["$scope",function(t){t.data=new Date}])},{}],5:[function(t,e,o){"use strict";angular.module("app.funcionario",["ui.router"]).config(["$stateProvider",function(t){t.state("funcionario.lista",{url:"/lista",templateUrl:"funcionario/lista.html",controller:"FuncionarioListaController"}).state("funcionario.novo",{url:"/novo",templateUrl:"funcionario/form.html",controller:"FuncionarioNovoController"}).state("funcionario.entrada",{url:"/entrada",templateUrl:"funcionario/entrada.html",controller:"FuncionarioEntradaController"}).state("funcionario.editar",{url:"/{id}",templateUrl:"funcionario/form.html",controller:"FuncionarioEditarController"})}]).controller("FuncionarioListaController",["$scope","seed","$state",function(t,e,o){t.funcionarios=e.funcionarios,t.alterar=function(t){o.go("funcionario.editar",{id:t})},t.remover=function(e){t.funcionarios.splice(e,1)}}]).controller("FuncionarioNovoController",["$scope",function(t){t.opts=["MATÉRIA-PRIMA","REVENDA","MANUFATURA"]}]).controller("FuncionarioEditarController",["$scope",function(t){t.opts=["MATÉRIA-PRIMA","REVENDA","MANUFATURA"]}]).controller("FuncionarioEntradaController",["$scope","$state",function(t,e){t.opts=["MATÉRIA-PRIMA","REVENDA","MANUFATURA"],t.entrada=function(){var e=new Date;alert("Entrada ou saida em "+e.getHours()+":"+e.getMinutes()),t.login="",t.senha=""}}])},{}],6:[function(t,e,o){"use strict";angular.module("app.login",["ui.router"]).config(["$stateProvider",function(t){t.state("login",{url:"/login",templateUrl:"./app/login/login.html",controller:"LoginController"})}]).controller("LoginController",["$scope","LoginService","$state",function(t,e,o){e.doLogout(),t.doLogin=function(t){e.doLogin(t).then(function(t){sessionStorage.setItem("token",t.data.token),o.go("home")})}}]).service("LoginService",["$http",function(t){var e=location.origin+"/authenticate";this.doLogin=function(o){return t.post(e,o)},this.doLogout=function(){localStorage.removeItem("token")}}])},{}],7:[function(t,e,o){"use strict";angular.module("app.ordemProducao",["ui.router"]).config(["$stateProvider",function(t){t.state("ordemProducao.lista",{url:"/lista",templateUrl:"app/ordemproducao/lista.html",controller:"ordemProducaoListaController"}).state("ordemProducao.novo",{url:"/novo",templateUrl:"app/ordemproducao/form.html",controller:"ordemProducaoFormController",resolve:{entity:function(){return{}}}}).state("ordemProducao.editar",{url:"/:id",templateUrl:"app/ordemproducao/form.html",controller:"ordemProducaoFormController",resolve:{entity:["ordemProducaoService","$stateParams",function(t,e){return ordemProducaoService.getById(e.id).then(function(t){return t.data})}]}})}]).controller("ordemProducaoListaController",["$scope","$state","ordemProducaoService",function(t,e,o){function r(){o.get().then(function(e){t.ordensProducao=e.data})}r(),t.remover=function(t){o.remove(t).then(function(t){r()})},t.alterar=function(t){e.go("ordemProducao.editar",{id:t})}}]).controller("ordemProducaoFormController",["$scope","$state","ordemProducaoService","entity","ProdutoService",function(t,e,o,r,n){function a(t){console.log(t)}t.entity=r,t.entity.itemProducao=t.entity.itemProducao||[],t.save=function(r){null==r._id?(r.dataPrazo=t.dataPrazo,o.save(r).then(function(t){e.go("ordemProducao.lista")},a)):(r.dataPrazo=t.dataPrazo,o.update(r).then(function(t){e.go("ordemProducao.lista")},a))},t.arrTipoOrdens=["INTERNA","CLIENTE"],t.entity.tipoOrdem=t.arrTipoOrdens[0],t.entity.dataPrazo=new Date(t.entity.dataPrazo)||new Date,null!=t.entity.dataPrazo&&(t.dataPrazo=new Date(t.entity.dataPrazo))}]).service("ordemProducaoService",["$http",function(t){var e=window.location.origin+"/api/ordemproducao";this.get=function(o,r){return t.get(e)},this.getById=function(o){return t.get(e+"/"+o)},this.save=function(o){return t.post(e,o)},this.update=function(o){return t.put(e+"/"+o._id,o)},this.remove=function(o){return t["delete"](e+"/"+o)}}])},{}],8:[function(t,e,o){"use strict";angular.module("app.pedidoCompra",["ui.router"]).config(["$stateProvider",function(t){t.state("pedidoCompra.lista",{url:"/lista",templateUrl:"app/pedidocompra/lista.html",controller:"pedidoCompraListaController"}).state("pedidoCompra.novo",{url:"/novo",templateUrl:"app/pedidocompra/form.html",controller:"pedidoCompraFormController",resolve:{entity:function(){return{}}}}).state("pedidoCompra.editar",{url:"/:id",templateUrl:"app/pedidocompra/form.html",controller:"pedidoCompraFormController",resolve:{entity:["pedidoCompraService","$stateParams",function(t,e){return t.getById(e.id).then(function(t){return t.data})}]}})}]).controller("pedidoCompraListaController",["$scope","$state","pedidoCompraService",function(t,e,o){function r(){o.get().then(function(e){t.pedidoCompras=e.data})}r(),t.remover=function(t){o.remove(t).then(function(t){r()})},t.alterar=function(t){console.log(t),e.go("pedidoCompra.editar",{id:t})}}]).controller("pedidoCompraFormController",["$scope","$state","pedidoCompraService","entity",function(t,e,o,r){function n(t){console.log(t)}t.entity=r,t.entity.itensPedido=t.entity.itensPedido||[],t.save=function(r){null==r._id?(r.dataVencimento=t.dataVencimento,o.save(r).then(function(t){e.go("pedidoCompra.lista")},n)):(r.dataVencimento=t.dataVencimento,o.update(r).then(function(t){e.go("pedidoCompra.lista")},n))},t.remover=function(e){console.log(t.entity.itensPedido),t.entity.itensPedido.splice(e,1)},t.add=function(e){t.entity.itensPedido.push(angular.copy(e)),t.itemPedidoCompra={}},t.entity.dataVencimento=new Date(t.entity.dataVencimento)||new Date,null!=t.entity.dataVencimento&&(t.dataVencimento=new Date(t.entity.dataVencimento))}]).service("pedidoCompraService",["$http",function(t){var e=window.location.origin+"/api/pedidocompra";this.get=function(o,r){return t.get(e)},this.getById=function(o){return t.get(e+"/"+o)},this.save=function(o){return t.post(e,o)},this.update=function(o){return t.put(e+"/"+o._id,o)},this.remove=function(o){return t["delete"](e+"/"+o)}}])},{}],9:[function(t,e,o){"use strict";angular.module("app.produto",["ui.router"]).config(["$stateProvider",function(t){t.state("produto.lista",{url:"/lista",templateUrl:"./app/produto/lista.html",controller:"ProdutoListaController"}).state("produto.novo",{url:"/novo",templateUrl:"./app/produto/form.html",controller:"ProdutoFormController",resolve:{entity:function(){return{type:null,lowestQuantity:null,code:null,value:null,name:null,supplier:null,description:null,actualQuantity:0}}}}).state("produto.editar",{url:"/:id",templateUrl:"app/produto/form.html",controller:"ProdutoFormController",resolve:{entity:["ProdutoService","$stateParams",function(t,e){return t.getId(e.id).then(function(t){return t})}]}})}]).service("ProdutoService",["$http",function(t){function e(e){return t.get("/api/produto",e).then(function(t){return t.data})}function o(e){return t.get("/api/produto/missing",e).then(function(t){return t.data})}function r(e){return t.get("/api/produto/"+e).then(function(t){return t.data})}function n(e){return t.put("/api/produto/"+e._id,e)}function a(e){return t.post("/api/produto",e)}function i(e){return t["delete"]("/api/produto/"+e)}this.get=e,this.getMissing=o,this.getId=r,this.update=n,this.save=a,this.remove=i}]).controller("ProdutoListaController",["$scope","$state","ProdutoService",function(t,e,o){t.get=function(e){o.get(0).then(function(e){t.list=e})},t.getMissing=function(e){o.getMissing(0).then(function(e){t.missingList=e})},t.remover=function(e){o.remove(e).then(function(e){t.get(0)})},t.alterar=function(t){e.go("produto.editar",{id:t._id})},t.get(0),t.getMissing(0)}]).controller("ProdutoFormController",["$scope","entity","$state","ProdutoService",function(t,e,o,r){function n(t){var e=void 0;e=t._id?r.update(t):r.save(t),e.then(function(t){200==t.status&&o.go("produto.lista")})}t.entity=e||{},t.opts=["MATERIA-PRIMA","REVENDA","MANUFATURADO"],t.saveOrUpdate=n}]).controller("ProdutoEmFaltaController",["$scope","$state",function(t,e){t["in"]=!0,t.valores=[{nome:"Farinha Aviação",tipo:"MATERIA PRIMA",valor:12.5,qntdMin:3}],t.remover=function(e){t.valores.splice(e,1)},t.alterar=function(t){e.go("produto.editar",{id:t})}}])},{}],10:[function(t,e,o){"use strict";angular.module("app.relatorio",["ui.router"]).config(["$stateProvider",function(t){t.state("relatorio.lista",{url:"/lista",templateUrl:"relatorio/lista.html",controller:"RelatorioListaController"})}]).controller("RelatorioListaController",["$scope",function(t){t.options=["Geral","Despesa","Lucro","Folha Salarial"],t.select="Geral",t.isAble=function(){return"Folha Salarial"==t.select?t.inicio:""!=t.select?t.inicio&&t.fim:void 0}}])},{}],11:[function(t,e,o){"use strict";angular.module("app.usuario",["ui.router"]).config(["$stateProvider",function(t){t.state("usuario.lista",{url:"/lista",templateUrl:"app/usuario/lista.html",controller:"UsuarioListaController"}).state("usuario.novo",{url:"/novo",templateUrl:"app/usuario/form.html",controller:"UsuarioFormController",resolve:{entity:function(){return{}}}}).state("usuario.editar",{url:"/{id}",templateUrl:"app/usuario/form.html",controller:"UsuarioFormController",resolve:{entity:["UsuarioService","$stateParams",function(t,e){return t.getById(e.id).then(function(t){return t.data})}]}})}]).controller("UsuarioListaController",["$scope","$state","UsuarioService",function(t,e,o){function r(){o.get().then(function(e){t.usuarios=e.data})}r(),t.remover=function(t){o.remove(t).then(function(t){r()})},t.alterar=function(t){e.go("usuario.editar",{id:t})}}]).controller("UsuarioFormController",["$scope","UsuarioService","$state","entity",function(t,e,o,r){function n(){o.go("usuario.lista")}t.entity=r,t.tipos=["VENDA","PRODUCAO","ENCOMENDA","ESTOQUE","ENTREGA","GERENCIA"],t.save=function(t){t._id?e.update(t).then(n):e.save(t).then(n)}}]).service("UsuarioService",["$http",function(t){var e="http://localhost:8000/api/usuario";this.get=function(o,r){return t.get(e)},this.getById=function(o){return t.get(e+"/"+o)},this.save=function(o){return t.post(e,o)},this.update=function(o){return t.put(e+"/"+o._id,o)},this.remove=function(o){return t["delete"](e+"/"+o)}}])},{}],12:[function(t,e,o){"use strict";angular.module("app.venda",["ui.router","ui.bootstrap"]).config(["$stateProvider",function(t){t.state("venda.lista",{url:"/lista",templateUrl:"venda/list.html",controller:"VendaController"})}]).controller("VendaController",["$scope","$modal",function(t,e){t.sales=[],t.getPrecos=function(t){return t.vendas.reduce(function(t,e){return t+=e.number*e.product.value},0)},t.open=function(){var o=e.open({animation:!0,backdrop:!1,templateUrl:"modaltemplate.html",controller:"ModalController",size:"md"});o.result.then(function(e){t.sales.push(e)})}}]).controller("ModalController",["$scope","$modalInstance","seed",function(t,e,o){t.products=o.produtos,t.clientes=o.clientes,t.addedProducts=[],t.add=function(e){t.addedProducts.push(angular.copy(e)),t.sale.number=0,t.sale.item=t.products[0]},t.close=function(o){return o?(e.close({cliente:t.cliente,vendas:t.addedProducts}),0):void e.dismiss()}}])},{}]},{},[1]);
//# sourceMappingURL=bundle.js.map
