// conexão com banco de dados
const connection =require('../database/connection');
//conexão com modulo de crypton 
const crypto = require('crypto');


// exporta um objeto com os metodos 
//decentraliza os modulos do sistema 
module.exports ={//para exportar o metodo
    async index (request, response){
        const ongs = await connection('ongs').select('*');// * seleciona todos os dados. await faz aguardar
         
       return response.json(ongs);//faz retornar o array
     },


//inicio do create 
    async create (request, response) {// create e nome que se da para puxar posteriormente 
        const { nome, email, whattsapp, cidade, uf} = request.body;
    //data é = dado  
    // substituir o data pelo que se espera dentro de chaves
        
        // gerando is randomico com crypon
        const id = crypto.randomBytes(4).toString('HEX');
        
        //buscando a conexão e inserindo os dados
        //await faz o javascript espera a execução do comando
        await connection('ongs').insert({
            id,
            nome,
            email,
            whattsapp,
            cidade,
            uf,
        });
        return response.json({ id});
    }
};