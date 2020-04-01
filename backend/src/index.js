const express = require('express');
const cors =require('cors')
const routes = require('./routes');
/* criando aplicação*/

const app = express();

/*informar que sera utilizado jason
*/
app.use(cors());

app.use(express.json());
app.use(routes);
/*'''inciando a navegação'''*/
/*app.get('/', (request, response) => {
    return response.send('Ola mundo !');
});*/
/*transformando em um jason*/ 

/*
metodos HTTP 

-> get: busca uma informação do back-dend
-> POST :Cria uma informação no back-end 
-> put altera uma informação no back end 
-> DELETE deleta uma informação


->tipos de paramentros 

- query parms - paramentro nomeados na rota apos o simbolo de enterrogação sendo eles para filtros ou interrogaçoes 
- route parms - para indentificar um recurso
-request body - cria o corpo da informação
*/ 




/*'''Instanciando porta '''*/
app.listen(3333);

