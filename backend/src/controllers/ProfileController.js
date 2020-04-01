//importando banco de dados
const connection =require('../database/connection');

module.exports={
    async index(request, response){
        const ong_id =  request.headers.authorization;// Vem dados da requiição 
        const incidents = await connection('incidents')//buscando incidentes
            .where('ong_id',ong_id)
            .select('*');

        return response.json(incidents);
    }

}