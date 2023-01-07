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

    },
    logIn() {

    },
    logOut() {

    }
}