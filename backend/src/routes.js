const express = require('express');

const OngController =require('./controllers/OngController');//aponta para a pasta do ong controller
const IncidentsController =require('./controllers/IncidentsController');//aponta para a pasta do Incidentes controller
const ProfileController =require('./controllers/ProfileController');//aponta para a pasta do Profile controller
const SessionController =require('./controllers/SessionController');//aponta para a pasta do Profile controller

const routes = express.Router();


//criando rota para listar ongs do banco de dados--------------------------------------------------
routes.get('/ongs', OngController.index);
//-------------------------fecha rotas que liga as ongs no bd----------------------------------
//Cria as ongs junto ao BD
routes.post('/ongs', OngController.create);


//session controle 
//faz o controle do login
routes.post('/sessao', SessionController.create);

//profile
routes.get('/profile', ProfileController.index);



//listar incidentes 
routes.get('/incidents',IncidentsController.index);

// importando rota de incidentes
routes.post('/incidents',IncidentsController.create);

//rota para deletar um caso dentro do banco de dados
routes.delete('/incidents/:id',IncidentsController.delete);
/*exportando os modulos */
module.exports = routes;