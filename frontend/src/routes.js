import React from 'react'
//importando gerenciador de rotas
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Logon from './pages/logon';
import Register from './pages/Register';
import Profile from './pages/profile';
import NewIncidents from './pages/NewIncident';

//sistema de rotas

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/> 
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncidents}/>


            </Switch>
        </BrowserRouter>
    )
}