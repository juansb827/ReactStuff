import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});



instance.defaults.headers['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

instance.interceptors.request.use(request =>{
    console.log("ReqConfINSTANCE", request);
    return request;
}, error => {
    console.log("ERROR sending request", error);
    //return throw new Error();
   return Promise.reject(error);      
})


export default instance;