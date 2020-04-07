import React, {useState} from 'react';

//importando gerenciador de link
import { Link, useHistory } from "react-router-dom";

//importando pacote de icones
import { FiArrowLeft } from 'react-icons/fi';


//importando a logo
import logoImg from '../../assets/logo.svg';

//importando pagina de css
import './style.css';
import api from '../../services/api';


export default function NewIncident(){
    const [titulo, setTitulo] = useState('');
    const [descrição, setDescrição] = useState('');
    const [value, setValue] = useState('');

    //informando ong id para poder cadastrar os casos
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();
    
    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            titulo,
            descrição,
            value,
        };
        try {
            await api.post('incidents',data,{
                headers:{
                    Authorization: ongId,
                }
            })
            //navegando o usuario até a rota profile
            history.push('/profile');

        } catch (err){
            alert('Erro ao cadastrat caso, tente novamente');
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Heroe"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para
                        encontrar um herói para resolver isso.
                    </p>
                    <Link className="back-link" to="/profile"> 
                        <FiArrowLeft size= {16} color="#E02041" /> 
                        Valtar para o home
                    </Link>

                </section>
                <form onSubmit = {handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={titulo}
                        onChange = {e => setTitulo(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={descrição}
                        onChange = {e => setDescrição(e.target.value)}
                    />
  
  
                  <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange = {e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>

                </form>

            </div>
        </div>
    );
}