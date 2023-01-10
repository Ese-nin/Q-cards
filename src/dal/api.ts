import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
    headers: {
        // API-KEY и прочее
    }
})

export const authAPI = {
    me() {
        return instance.post(`auth/me`);
    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logOut() {
        return instance.delete(`auth/me`);

    },
    register(email: string, password: string) {
        return instance.post(`auth/register`, {email, password})
    }
}