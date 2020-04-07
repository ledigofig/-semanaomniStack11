//primeiro passo importar o react pois precisa para usar o jsx
import React from 'react';

//h1 vai o nome do cabeçalho
//export default antes é a mesma coisa que export default Header; ao final do codigo
//a chaves dentro do Header e h1 deve-se devido ser a forma de exportar o java script
//propriedade de forma automatica é children props.children
// e bom fazer a destreturação para saber quais propriedade quer obter-se 
//Estado - para receber uma iteração com usuario
export default function Header({children}) {
    return (
        <header>
            <h1>{children}</h1>
        </header>
    );
  }