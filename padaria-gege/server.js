'use strict';
/*
  Neste trecho de código, chamamos as bibliotecas que utilizaremos nesta aplicação.

  O Express é a biblioteca que é utilizado para criar o servidor e
  conexões REST para que seja possível a comunicação com o FrontEnd.

  O Mongoose é a biblioteca que vamos utilizar para fazer a comunicação com o MongoDB.
  Além disso, é ela que cria o MODELO do aplicação.

  Parser é uma biblioteca construída em cima do Express utilizada para tranformar
  os valores que são passados entre o servidor e o cliente.

  Cors é uma biblioteca que permite que, caso queíramos, pudéssemos acessar os valores
  de um outro servidor. Isto é útil caso queíramos colocar o FrontEnd em outro servidor.

  Method Override é uma biblioteca para que seja possível identificar o verbo REST
  (GET,POST,PUT,DELETE) através dos Headers de uma chamada. Isto é utilizado em navegadores
  antigos.
 */
let express   = require('express'),
    mongoose  = require('mongoose'),
    parser    = require('body-parser'),
    cors      = require('cors'),
    mOverride = require('method-override'),
    app       = express(),
    db        = mongoose.connection,
    port      = process.env.PORT || 8000,
    config    = require('./config/config');

/*
  Neste trecho de código estamos colocando eventos para serem disparados quando a conexão
  com o banco seja aberta, ou tenha tido um erro.
 */

db
  .on('error', () => console.error('Conexão com o MongoDB não pode ser concluída'))
  .on('open', () => console.log('Conexão aberta com o MongoDB'));

/*
  Neste trecho de código estamos utilizando as bibliotecas mencionadas no primeiro comentário,
  e as adicionando ao express para criarmos a aplicação.
 */

app
  .use(cors())
  .use(mOverride('X-HTTP-Method-Override'))
  .use(parser.json())
  .use(parser.urlencoded({extended: true}))
  .use(express.static(__dirname + '/public'))
  .listen(port)

console.log(`The server is running on port: ${port}`);

/*
  Neste trecho de código, serão chamadas as rotas da aplicação que farão conexão entre o FrontEnd e o BackEnd.
  A arquitetura está dividida em camadas, sendo que as camadas são as seguintes:

  MODELO: Representada pelos Modelos e Services . É no Service que ficará a regra de negócio caso exista, e as possíveis validações.
  CONTROLLER: Representada pelo Controller, é o local aonde é feita a intermediação dos dados que vem da rota com o modelo.
  VISÃO: Representada no BackEnd pelas rotas, que são o ponto de conexão entre o navegador e o servidor.

  Rotas chamam os controllers que chamam os services que usa o modelo.
 */
require(__dirname + '/app/produto/route/route')(app);
require(__dirname + '/app/usuario/route/route')(app);
require(__dirname + '/app/encomenda/route/route')(app);
require(__dirname + '/app/pedidocompra/route/route')(app);

/*
  Neste trecho de código estamos fazendo a conexão com o banco de dados.
 */
mongoose.connect(config.dbUrl);
