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

    getLoginToken(email, password) {
        const form = new URLSearchParams()
        form.append('username', email) // username as email to comply with OAuth
        form.append('password', password)
        return tokenApi.post("/token", form)
    },
    postUser(access_token, email, name, password) {
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
    getUser(access_token) {
        return apiV5.get("/users", {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    deleteUser(access_token) {
        return apiV5.delete("/users", {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    getPanels(access_token) {
        return apiV5.get("/panels", {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })

    },
    postPanel(access_token, position, title, description) {
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
    patchPanel(access_token, panel_id, update) {

        return apiV5.patch("/panels/" + panel_id,
            update,
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                }

            })
    },
    deletePanel(access_token, panel_id) {
        return apiV5.delete("/panels/" + panel_id, {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    postEntry(access_token, panel_id, is_complete) {

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
    getEntries(access_token, panel_id) {

        return apiV5.get(`/panels/${panel_id}/entries`, {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
    deleteEntries(access_token, panel_id) {
        return apiV5.delete("/panels/" + panel_id + '/entries', {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    getPanelConsistency(access_token) {

        return apiV5.get("/metrics/panels/consistency", {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
    postPasswordResetRequest(email) {
        const form = new URLSearchParams()
        form.append('email', email)

        return apiV5.post("/auth/request_password_reset",
            form,
        )
    },
    async postPasswordReset(new_password, email, password_reset_token) {
        const form = new URLSearchParams()
        form.append('new_password', new_password)
        form.append('email', email)
        form.append('password_reset_token', password_reset_token)
        
        const resp = await apiV5.post("/auth/password_reset", form)
        return resp

    },
    getRoutePerformance(access_token) {

        return apiV5.get("/admin/routes", {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
    getRouteTimings(access_token, method_path, window_size) {

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