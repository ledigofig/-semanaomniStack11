import React from 'react';
import { Feather } from '@expo/vector-icons';//importando icones 
import { useNavigation, useRoute } from '@react-navigation/native';
// importando a navegação do icone de voltar 
//use Route - pegar informaçoes especificas da pagina atual
import { View, Text, Image , TouchableOpacity, Linking } from 'react-native';

//paconte não é nativo tem que importar via terminal 
//$ expo install expo-mail-composer
import * as MailCompose from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

/* na linha que tem [styles.incidentProperty, {marginTop:0}
    e devido ao fato de resetar 
    1° passo - defini um array de estilização 
    2° passo - coloca o objeto entre {} no exempo foi definido um margin top de 0 para primeira propriedade
    3° passo defini a estilização dentro
    obs - isso sobscreve o margin top para esse objeto da primeira estilização */
export default function Detail() {
    //fazendo a importação da variavel de navegação 
    const navigation = useNavigation();
    // declarando UseRouter
    const route = useRoute();

    //chamando incidentes da pagina aterior
    const incident = route.params.incident;
    //parms e paramentros que a rota recebeu anteriormente 

    // Criando corpo da mensange a ser enviada via whatts app e-mail
    const message = `ola ${incident.nome}, estou entrando em contato pois gostaria de ajudar no caso "${incident.titulo}" com o valor de ${Intl.NumberFormat('pt-BR', {style : 'currency', currency: 'BRL'}).format(incident.value)}`;


//criando função que ativa o icone arrow left para voltar 
    function navigationBack(){
        navigation.goBack();
    }
 // função de envio de e-mail.
    function sendMail() { 
        MailCompose.composeAsync({
            subject: `Herói do caso: ${incident.titulo}`,
            recipients: [incident.email],
            body: message,
        })
    };


// função de envio de Whatsapp.
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whattsapp}&text=${message}`);
    };

    return(
        <View style= {styles.container}> 
            <View style= {styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress = {navigationBack}
                    //() =>{}função vazia iicialmente depois foi substituido pelo componente correto
                    // substituição da função vazia pelo navigationBack
                >
                    <Feather name='arrow-left' size={28} color="#E02041"/>
                </TouchableOpacity>
                
            </View>
            <View style={styles.incident}>
                <Text style = {styles.incidentProperty, {marginTop:0}}>ONG:</Text>
                <Text style = {styles.incidentvalue}>{incident.nome} de {incident.cidade}/{incident.uf}</Text>

                <Text style = {styles.incidentProperty}>Caso:</Text>
                <Text style = {styles.incidentvalue}>{incident.titulo}</Text>

                <Text style = {styles.incidentProperty}>Valor</Text>
                <Text style = {styles.incidentvalue}>
                    {Intl.NumberFormat('pt-BR', {style : 'currency', currency: 'BRL'}).format(incident.value)}
                </Text>
            </View>


            <View style= {styles.contactBox}>
                <Text style = {styles.heroTitle}>Salve o dia!</Text>
                <Text style = {styles.heroTitle}>Seja o heroi desse caso.</Text>

                <Text style = {styles.heroDescription}>Entre em contato:</Text>

                <View style= {styles.actions}>
                    <TouchableOpacity 
                        style={styles.action}
                        onPress = {sendWhatsapp}
                        //função vazia iicialmente depois foi substituido pelo componente correto
                    >
                        <Text style={styles.actionText}>
                            WhatsApp
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.action}
                        onPress = {sendMail}
                        //função vazia iicialmente depois foi substituido pelo componente correto
                    >
                        <Text style={styles.actionText}>
                            E-mail
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
          
        </View>
);
}