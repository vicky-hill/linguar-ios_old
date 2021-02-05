import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: 'https://linguar.net/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            config.headers['x-auth-token'] = token
        }

        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default instance;