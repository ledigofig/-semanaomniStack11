//importando banco de dados
const connection =require('../database/connection');

module.exports={
    async index (request, response) {
        //paginando em 5 incidentes por vez
        const {page = 1}= request.query;//page é como é chamado

        //exibindo o total de casos
        const [count] = await connection('incidents').count();

        //console.log(count)//retornando pelo console
        //fim da exibição de todos os casos


        const incidents = await connection('incidents')
            //esquema de paginação
            //trazendo dados especificos 
            .join('ongs','ongs.id','=','incidents.ong_id')
            //Fim do trazendo dados especificos 
            .limit(5)
            .offset((page - 1)* 5)
            .select([
               'incidents.*',
                'ongs.nome',
                'ongs.email',
                'ongs.whattsapp',
                'ongs.cidade',
                'ongs.uf']);
            //fim do trazendo dados especificos
            // * seleciona todos os dados. await faz aguardar
            //fim da paginação 
        // Voltando a resposta pelo header feita com o count
        response.header('X-total-count', count['count(*)']);
        // Fim da Voltando a resposta pelo header

        return response.json(incidents);
    },



    async create (request, response) {
        const {titulo,descrição,value,} = request.body;
        const ong_id =  request.headers.authorization;// Vem dados da requiição 

        const [id] = await connection('incidents').insert({
            titulo,
            descrição,
            value,
            ong_id,
        });

        return response.json({ id });

    },
    //verificação de usuraio para exclusão
    async delete (request, response) {
        const{ id } =request.params;// Parms parametro de rota 
        const ong_id =  request.headers.authorization;// Vem dados da requiição 

        const incident = await connection('incidents')
            .where('id',id) 
            .select ('ong_id') 
            .first();

        if (incident.ong_id != ong_id){
            return response.status(401).json({error:'operação não autorizada.'});
        }
        //Deletando dados
        await connection('incidents').where('id',id).delete();

        return response.status(204).send();

    }
};