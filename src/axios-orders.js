import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burguer-1fcc5.firebaseio.com/'
});

export default instance;