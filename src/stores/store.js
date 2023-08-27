import { defineStore } from 'pinia'
import requests from '@/services/requests.js'
import VueCookies from 'vue-cookies'

export const useStore = defineStore({
    id: '',
    state: () => ({
        panels: [],
        messages: [],
        entries: [],
        user: null,
        primaryTrayIsOpen: false,
        secondaryTrayIsOpen: false,
        leftNavIsOpen: false,
        primaryComponentName: null,
        primaryComponentProps: {},
        panelSortBoxIsOpen: false,
        panelTitleEditState: false,
        panelDescEditState: false
    }),
    actions: {
        async getLoginTokenAction(email, password) {
            try {
                const response = await requests.getLoginToken(email, password)
                VueCookies.set('9p_access_token', response.data.access_token, '30d', '', '', 'true')
                await this.getUserAction()
                return response.data.access_token
            } catch (error) {
                this.messages.push({ message: error.response.data.detail, error: true })
                setTimeout(() => this.messages.shift(), 5000)
            }
        },
        async deleteUserAction() {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.deleteUser(access_token)
                this.signUserOutAction()
            } catch (error) {
                this.messages.push({ message: error.response.data.detail, error: true })
                setTimeout(() => this.messages.shift(), 5000)
            }
        },
        signUserOutAction() {
            try {
                VueCookies.remove("9p_access_token")
            } catch (error) {
                console.log("no cookie to remove " + error)
            }
            this.user = null
            this.entries = []
            this.panels = []
        },
        async createUserAction(email, name, password) {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.postUser(access_token, email, name, password)
                await this.getLoginTokenAction(email, password)
                return true
            } catch (error) {
                this.messages.push({ message: error.response.data.detail, error: true })
                setTimeout(() => this.messages.shift(), 5000)
                return false
            }
        },
        getUserAction() {

            const access_token = VueCookies.get("9p_access_token")

            if (access_token) {
                return requests.getUser(access_token)
                    .then(response => {
                        this.user = response.data

                        return response.data
                    })
                    .catch(error => {

                        this.messages.push({ message: error.response.data.detail, error: true })
                        setTimeout(() => this.messages.shift(), 5000)
                    })
            } else {
                this.messages.push({ message: "There's an issue with your credentials... 😬", error: true })
                setTimeout(() => this.messages.shift(), 5000)
            }
        },
        async createPanelAction(position, title, description) {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.postPanel(access_token, position, title, description)
                await this.getPanelsAction()
            } catch (error) {
                this.messages.push({ message: error.response.data.detail, error: true })
                setTimeout(() => this.messages.shift(), 5000)
            }
        },
        async updatePanelAction(panel_id, update) {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.patchPanel(access_token, panel_id, update)
                await this.getPanelsAction()
                return true
            } catch (error) {
                this.messages.push({ message: error.response.data.detail, error: true })
                setTimeout(() => this.messages.shift(), 5000)
                return false
            }
        },
        async deletePanelAction(panel_id) {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.deletePanel(access_token, panel_id)
                await this.getPanelsAction()
            } catch (error) {
                this.messages.push({ message: error.response.data.detail, error: true })
                setTimeout(() => this.messages.shift(), 5000)
            }
        },
        getPanelsAction() {
            const access_token = VueCookies.get("9p_access_token")
            if (access_token) {
                return requests.getPanels(access_token)
                    .then(response => {
                        this.panels = response.data
                        return response.data
                    })
                    .catch(error => {
                        this.messages.push({ message: error.response.data.detail, error: true })
                        setTimeout(() => this.messages.shift(), 5000)
                    })
            } else {
                this.messages.push({ message: "Having a bit of trouble getting your panels... 😬", error: true })
                setTimeout(() => this.messages.shift(), 5000)
            }
        },
        postEntryAction(panel_id, is_complete) {
            const access_token = VueCookies.get("9p_access_token")
            if (access_token) {
                return requests.postEntry(access_token, panel_id, is_complete)
                    .then(response => {

                        this.getPanelsAction()
                        return response.data
                    })
                    .catch(error => {
                        this.messages.push({ message: error.response.data.detail, error: true })
                        setTimeout(() => this.messages.shift(), 5000)
                    })
            } else {
                this.messages.push({ message: "Having a bit of trouble setting your panel status... 😬", error: true })
                setTimeout(() => this.messages.shift(), 5000)
            }
        }

    }
},
)