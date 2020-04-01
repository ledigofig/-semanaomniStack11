//faz a conexão com o banco de dados
//importa o knex
const knex =require('knex');

//buscando arquivo de configuração do knex
const configuration = require('../../knexfile');

//puxando a linha de configuração com o banco de dados
const connection = knex(configuration.development);

//exportando modulo de conexão com banco de daodos
module.exports = connection;