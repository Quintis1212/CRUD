import axios from 'axios';
//set base URL for less code ...
const instance = axios.create({
    baseURL:'https://shop-2f42b-default-rtdb.firebaseio.com/'
})

export default instance;