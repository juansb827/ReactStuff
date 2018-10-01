import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-64232.firebaseio.com/'
});

export default instance;