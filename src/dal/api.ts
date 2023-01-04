import axios from 'axios'

const instance = axios.create({
    baseURL: 'bla-bla.com',
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