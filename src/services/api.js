// use http verbs throughout

import axios from "axios"
import { v4 as uuidv4 } from "uuid"


const tokenApi = axios.create({
    baseURL: import.meta.env.VITE_NINEPANELS_SERVER_ROOT,

})

const apiV5 = axios.create({
    baseURL: import.meta.env.VITE_NINEPANELS_SERVER_ROOT + '/v5',

})

apiV5.interceptors.request.use((config) => {
    config.headers['X-Request-ID'] = uuidv4()
    return config
});

apiV5.interceptors.response.use(
    response => {
        localStorage.setItem('lastReload', new Date().toDateString())
        return response
    },
    error => {
        return Promise.reject(error)
    }
)


export default {

    async getLoginToken(email, password) {
        const form = new URLSearchParams()
        form.append('username', email) // username as email to comply with OAuth
        form.append('password', password)
        return tokenApi.post("/token", form)
    },
    async postUser(access_token, email, name, password) {
        const form = new URLSearchParams()
        form.append('email', email) // not related to OAuth so using 'email'
        form.append('name', name)
        form.append('password', password)
        return apiV5.post(
            "/users",
            form,
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                }
            }
        )
    },
    async getUser(access_token) {
        return apiV5.get("/users", {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    async deleteUser(access_token) {
        return apiV5.delete("/users", {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    async getPanels(access_token) {
        return apiV5.get("/panels", {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })

    },
    async postPanel(access_token, position, title, description) {
        const form = new URLSearchParams()
        form.append('position', position)
        form.append('title', title)
        form.append('description', description)
        return apiV5.post("/panels",
            form,
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                }
            }

        )
    },
    async patchPanel(access_token, panel_id, update) {

        return apiV5.patch("/panels/" + panel_id,
            update,
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                }

            })
    },
    async deletePanel(access_token, panel_id) {
        return apiV5.delete("/panels/" + panel_id, {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    async postEntry(access_token, panel_id, is_complete) {

        return apiV5.post(`/panels/${panel_id}/entries`,
            {
                is_complete: is_complete
            },
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                }

            })
    },
    async getEntries(access_token, panel_id) {

        return apiV5.get(`/panels/${panel_id}/entries`, {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
    async deleteEntries(access_token, panel_id) {
        return apiV5.delete("/panels/" + panel_id + '/entries', {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },

    // DEPR
    async getPanelConsistency(access_token) {

        return apiV5.get("/metrics/panels/consistency", {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
    async postPasswordResetRequest(email) {
        const form = new URLSearchParams()
        form.append('email', email)

        return apiV5.post("/auth/request_password_reset",
            form,
        )
    },

    // EXAMPLE OF BEST PRACTICE
    async postPasswordReset(new_password, email, password_reset_token) {
        const form = new URLSearchParams()
        form.append('new_password', new_password)
        form.append('email', email)
        form.append('password_reset_token', password_reset_token)

        const resp = await apiV5.post("/auth/password_reset", form)
        return resp

    },
    async getRoutePerformance(access_token) {

        return apiV5.get("/admin/routes", {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
    async getRouteTimings(access_token, method_path, window_size) {

        return apiV5.get("/admin/routes/timings", {
            params: {
                method_path: method_path,
                window_size: window_size
            },
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
}