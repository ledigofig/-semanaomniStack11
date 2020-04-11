import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';//importando icones 
//codigo abaixo importa o use navegation
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; 
//TouchableOpacity - tarna clicavel
//FlatList - cria o sistema de rolagem

import logoImg from '../../assets/logo.png';
//importando estilos
import styles from './styles';
//import { setLightEstimationEnabled } from 'expo/build/AR';

//importando API
import api from '../../services/api'

export default function Incidents() { 
    //implementando use state
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    //controle de pagina 
    //valor de 1 é para inciar na pagina 1
    const [page, setPage] = useState(1);
    
    //criando estado de loading para evitar buscar em paginas anteriores
    const [loading, setLoading] = useState(false);

    //armazenando o total para mostrar no total de casos


    //inicio da função que cria sistema de navegação ate os detalhes dos casos
    const navigation = useNavigation();

    function navigateToDetail(incident ){
        navigation.navigate('Detail', {incident});
    }
    //fim da navegação até detalhe dos casos

// implementando use effect
    async function loadIncidents (){
        //criando if para buscar só quando for true
        if (loading) {
            return;
        }
        // if para buscar so quando for necessario e cumprindo os requisitos
        //requisitos de total maior que zero
        // e de a soma de incidente for igual ao total
        if (total > 0 && incidents.length == total){
            return;
        }
        //se todos os requisitos forem atendindos então carrega proxima pagina
        setLoading(true);

        const response = await api.get('incidents',{
            params: {  
                'page': page 
            }
        });
        // apos a virgulavem o parametro para recarregar

        // implementando com useState
        setIncidents([... incidents, ...response.data]);//anexando dois vetore
        //pegando os dados do set Total
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);

        //carregando o setLoading
        //Liberação da trava.
        setLoading(false);

    }
    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style= {styles.container}> 
            <View style= {styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>
                        {total} casos
                    </Text>
                </Text>
            </View>
            <Text style={styles.title}>
                Bem vindo!
            </Text>
            <Text style = {styles.descricao}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor= {incident => String(incident.id)}
                //função que dispara sozinho após chegar ao fim da lista
                onEndReached= {loadIncidents}
                //função que defini quando vai se disparado o carregamento
                onEndReachedThreshold={0.2}


                //retornar o valor unico de cada informação
                //o codigo abaixo não deixa o scrool ser exibido
                //por padrão o valor unico é o ID
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident })=>( 
                    //foi desetruturado somente para o Item
                    //Foi tocado o nome do item para icidente a iimplementação é 
                    <View style={styles.incident}>
                        <Text style = {styles.incidentProperty}>ONG:</Text>
                        <Text style = {styles.incidentvalue}>{incident.nome}</Text>

                        <Text style = {styles.incidentProperty}>Caso:</Text>
                        <Text style = {styles.incidentvalue}>{incident.titulo}</Text>

                        <Text style = {styles.incidentProperty}>Valor</Text>
                        <Text style = {styles.incidentvalue}>
                            {Intl.NumberFormat('pt-BR', {style : 'currency', currency: 'BRL'}).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton}
                            onPress = {() => navigateToDetail(incident)}
                            //função vazia iicialmente depois foi substituido pelo componente correto

                        >
                            <Text style={styles.detailsButtonText}>
                                Ver mais detalhes
                            </Text>
                            <Feather name='arrow-right' size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>

                )}
            />

                
        </View>

    );
}

// parei em 38:41