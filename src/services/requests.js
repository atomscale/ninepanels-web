import axios from "axios"


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_NINEPANELS_SERVER_ROOT,
})

apiClient.interceptors.response.use(
    (response) => {
        localStorage.setItem('lastReload', new Date().toDateString())
        return response;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default {

    getLoginToken(email, password) {
        const form = new URLSearchParams()
        form.append('username', email) // username as email to comply with OAuth
        form.append('password', password)
        return apiClient.post("/token", form)
    },
    postUser(access_token, email, name, password) {
        const form = new URLSearchParams()
        form.append('email', email) // not related to OAuth so using 'email'
        form.append('name', name)
        form.append('password', password)
        return apiClient.post(
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
        return apiClient.get("/users", {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    deleteUser(access_token) {
        return apiClient.delete("/users", {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    getPanels(access_token) {
        return apiClient.get("/panels", {
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
        return apiClient.post("/panels",
            form,
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                }
            }

        )
    },
    patchPanel(access_token, panel_id, update) {

        return apiClient.patch("/panels/" + panel_id,
            update,
            {
                headers: {
                    Authorization: "Bearer " + access_token,
                }

            })
    },
    deletePanel(access_token, panel_id) {
        return apiClient.delete("/panels/" + panel_id, {
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
    deleteEntries(access_token, panel_id) {
        return apiClient.delete("/panels/" + panel_id + '/entries', {
            headers: {
                Authorization: "Bearer " + access_token,
            }
        })
    },
    getPanelConsistency(access_token) {

        return apiClient.get("/metrics/panels/consistency", {
            headers: {
                Authorization: "Bearer " + access_token,
            }

        })
    },
    postPasswordResetRequest(email) {
        const form = new URLSearchParams()
        form.append('email', email)

        return apiClient.post("/request_password_reset",
            form,
        )
    },
    postPasswordReset(new_password, email, password_reset_token) {
        const form = new URLSearchParams()
        form.append('new_password', new_password)
        form.append('email', email)
        form.append('password_reset_token', password_reset_token)

        return apiClient.post("/password_reset",
            form,
        )
    },
}