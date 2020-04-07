import React, { useState } from 'react';

//importando gerenciador de link
import { Link,useHistory } from "react-router-dom";

//importando pacote de icones
import { FiArrowLeft } from 'react-icons/fi';

// importndo api
import api from '../../services/api';

//importando a logo
import logoImg from '../../assets/logo.svg';

//importando pagina de css
import './style.css';
//import { useState } from "react";

//inicio do codigo da pagina
export default function Register(){
    //criando sistema que pega dados pelo input
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whattsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');


    //apos logon voltar a pagina de login
    const history = useHistory();

    //criando função especifica para pegar os registros
    //correção de carregamento 
    async function handleRegister(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            whattsapp,
            cidade,
            uf,
        };
        try {
            const response = await api.post('ongs', data); 

            alert (`Seu ID de acesso: ${response.data.id}`);
            //INSERIDO COM O USEHISTORY E FAZ O ENCAMINHAMENTO PARA A PASTA RAIZ DO SISTEMA
            history.push('/');

        } catch (err){ 
            alert('Erro no cadastro, tente novamente .');
         }
        
    }



    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Heroe"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataformae 
                        ajude pessoas a encontrarem os casos 
                        da sua ong
                    </p>
                    <Link className="back-link" to="/"> 
                        <FiArrowLeft size= {16} color="#E02041" /> 
                        Não tenho cadastro
                    </Link>

                </section>
                <form onSubmit={handleRegister}>

                    <input 
                        placeholder="Nome da ong"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <input 
                        type="email" 
                        placeholder="E-Mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="Nome WhatsApp"
                        value={whattsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">

                        <input 
                        placeholder="Cidade"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                    />
                        <input 
                            placeholder="UF" 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            style = {{width:80 }} />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>

                </form>

            </div>
        </div>
)
}
//parei em 51:19
