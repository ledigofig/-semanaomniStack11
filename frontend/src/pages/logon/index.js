import React, { useState } from 'react';
//importando gerenciador de rotas
import { Link,useHistory } from "react-router-dom";
import api from '../../services/api';

//importando pacote de icones
import { FiLogIn } from 'react-icons/fi'

//importando pagina de css
import './style.css';
//importando imagens 
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    //ARMAZENAMENTO DE CAMPO 
    const [id, setId] = useState('');
    //utilizando o history
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try { 
            const response = await api.post('sessao', { id });

            //console.log(response.data.nome);
            //salvando para consultar
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.nome);

            //encaminhando para a rota profile 
            history.push('./profile')

         } catch (err) { 
            alert('falha no login, tente novamente');
         }


    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Heroe"/>
            
                <form onSubmit ={handleLogin}>
                
                    <h1>faça seu logon</h1>
                    
                    <input 
                        placeholder= "Sua ID" 
                        value={id}
                        onChange={e => setId (e.target.value)}
                    />
                    <button className="button" ype= "submit" >Entrar</button>


                    <Link className="back-link" to="/register"> 
                        <FiLogIn size= {16} color="#E02041" /> 
                        Não tenho cadastro
                    </Link>

                    
                  
                </form>
                

            </section>
            <img src={heroesImg} alt="heroes"/>
        </div>

    );
}