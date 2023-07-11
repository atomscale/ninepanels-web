import axios from "axios";

var baseURL = "http://127.0.0.1:8000"

const apiClient = axios.create({
    baseURL: baseURL,
});

export default {

    getLoginToken(email, password) {
        const form = new URLSearchParams()
        form.append('username', email) // username as email to comply with OAuth
        form.append('password', password)
        return apiClient.post("/token", form)
    },
    createUser(email, password) {
        const form = new URLSearchParams()
        form.append('email', email) // not related to OAuth so using 'email'
        form.append('password', password)
        return apiClient.post("/user", form)
    },
    getPanels() {
        return apiClient.get("/panels")
    },
}