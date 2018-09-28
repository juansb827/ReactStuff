import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

var reqInter = axios.interceptors.request.use(request =>{
    console.log("ReqConf", request);
    return request;
}, error => {
    console.log("ERROR sending request", error);
    //return throw new Error();
   return Promise.reject(error);      
})

var resInter = axios.interceptors.response.use(response =>{
    console.log("RESPONSE", response);
    return response;
}, error => {
    console.log("ERROR IN RESPONSE", error);    
    return Promise.reject(error);      
})

//axios.interceptors.request.eject(reqInter);
//axios.interceptors.response.eject(resInter);
ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
