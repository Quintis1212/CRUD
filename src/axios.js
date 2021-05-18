import axios from 'axios';

const instance = axios.create({
    baseURL:'https://shop-2f42b-default-rtdb.firebaseio.com/'
})

export default instance;