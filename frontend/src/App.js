import React from 'react';//import React,{useState} from 'react';
import Routes from './routes';
//inserindo css global
import './global.css';

//importa o use State junto com o react para auto incrementar 
//import logo from './logo.svg';----------------> deleta não utilizado
//import './App.css';----------------> deleta não utilizado
//inserindo a tag header criada anteriormente
//import Header from './Header'



//isso abaixo é uma jsx Java Script e XML
function App() {
  //criando a variavel de contador
  //adcionando useState faz com que a pagina atualiza automaticamente craindo assim um estado
  //retorna um array[valor, funcao de Atualização do valor], mas pode ser trocado
  //const [couter, setCounter] = useState(0);
  //fim da declaração de variavel

  //criando a função que implementa o contador 
  //function increment(){
  //  setCounter(couter + 1);
    //console.log(couter)
 // }
  //fim da criação a função que implementa o contador 

  return (
    <Routes />
    /*<div>
      <Header>
        Contador : {couter}
      </Header>
      <button onClick={increment}>
        Incremetar
      </button>
    </div>*/
  );
}

export default App;

//propriedades e quase o mesmo conceito de atributo html 
//exemplo o ID do html 
//criando componenete 
