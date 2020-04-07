//use Efect- para um componente quando ele é parado em tela
import React, { useState, useEffect} from 'react';
//importando gerenciador de rotas
import { Link, useHistory } from "react-router-dom";

//importando pacote de icones
import { FiPower, FiTrash2 } from 'react-icons/fi';

//importando API
import api from '../../services/api';

//importando pagina de css
import './style.css';
//importando imagens 
import logoImg from '../../assets/logo.svg';
//import { useEffect, useState } from "react";
//import heroesImg from '../../assets/heroes.png';
export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    //criando função de deltar
    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,{ 
                headers:{
                    Authorization: ongId,
                }
             });
           //removendo somente o caso deletado
           setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }
    //fazendo parte do logoff
    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }
    //fim do logoff
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Heroe"/>
                <span>Bem vindo {ongName}</span>

                <Link className="button" to="/incidents/new"> 
                        Cadastrar novo caso
                </Link>

                <button onClick={handleLogout} ype='button'>
                    <FiPower size= {18} color="#E02041" /> 
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key = {incident.id}>
                        <strong>CASO: </strong>
                        <p> {incident.titulo} </p>

                        <strong>DESCRIÇÃO: </strong>
                        <p> {incident.descrição} </p>

                        <strong>VALOR:</strong>
                        <p> {Intl.NumberFormat
                            ('pt-BR', {style:'currency', currency:'BRL'})
                            .format(incident.value)} </p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size= {20} color="#a8a8b3" /> 
                        </button>
                    </li>
                ))}
               
            </ul>
        </div>
    )
}
//parei em 1 hora de video