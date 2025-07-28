const knex = require('knex');
// Esta linha importa a biblioteca knex que nós instalamos via npm.
//  A variável knex agora contém a função principal da biblioteca, 
// que age como uma "fábrica" para criar conexões com o banco de dados. É o nosso "controle remoto genérico".
const configuration = require('../../knexfile');
// volte 2 pastas, que vai entrar na raiz do projeto e lá está a knexfile
// Esta linha importa o nosso arquivo de configuração, o knexfile.js.

const connection = knex(configuration.development);
// para pegar apenas o bloco de configuração do ambiente de desenvolvimento do nosso "manual"
// A função knex() usa essa configuração (que diz para usar o driver sqlite3, o arquivo db.sqlite, etc.) 
// para criar e retornar uma instância do Knex. Essa instância, que salvamos na variável connection, 
// é o nosso objeto de conexão, a ponte já estabelecida e pronta para ser usada para fazer consultas. 
// É o nosso "controle remoto programado".

module.exports = connection;
// Qualquer outro arquivo do nosso projeto (como o clienteController.js) que precisar falar
//  com o banco de dados, simplesmente fará um require('../database/connection'). Ao fazer isso, ele receberá 
// esta mesma e única instância de conexão que criamos aqui. Isso garante que todo o nosso aplicativo 
// use a mesma "ponte" para falar com o banco,  o que é eficiente e muito mais fácil de manter.

// Usar o "manual" (knexfile.js) para "programar" a ferramenta genérica (knex) e 
// criar uma conexão única, especializada e pronta para uso, 
// que ele então disponibiliza para o resto da aplicação.