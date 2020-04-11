//importa axios
import axios from 'axios';

//criando variavel
const api = axios.create({
    baseURL: 'http://192.168.1.9:3333',
});

export default api;