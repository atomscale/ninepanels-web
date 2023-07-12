import axios from "axios"

var baseURL = "https://api.ninepanels.com"

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
    getPanels(access_token) {
        console.log("api url:", baseURL)
        return apiClient.get("/panels", {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })

    },
    getEntries(access_token) {

        return apiClient.get("/entries", {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
    postEntry(access_token, panel_id, is_complete) {

        return apiClient.post("/entries",
        {
            panel_id: panel_id,
            is_complete: is_complete
        },
        {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
}