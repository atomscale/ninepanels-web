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
        trayIsOpen: false,
        leftNavIsOpen: false,
        componentName: null,
        componentProps: {}
    }),
    actions: {
        async getLoginTokenAction(email, password) {
            try {
                const response = await requests.getLoginToken(email, password)
                VueCookies.set('9p_access_token', response.data.access_token, '30d', '', '', 'true')
                await this.getUserAction()
                return response.data.access_token
            } catch (error) {
                console.log("issue gettign access token", error)
                this.messages.push({ message: error.response.data.detail, error: true })
                setTimeout(() => this.messages.shift(), 5000)
            }
        },
        async deleteUserAction() {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.deleteUser(access_token)
                console.log(response.data)
                this.signUserOutAction()
            } catch (error) {
                console.log("issue deleting user in action", error)
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
                console.log("created user: " + response.data.id)
                await this.getLoginTokenAction(email, password)
                return true
            } catch (error) {
                this.messages.push({ message: error.response.data.detail, error: true })
                setTimeout(() => this.messages.shift(), 5000)
                console.log("createUserAction error: " + error)
                return false
            }
        },
        getUserAction() {

            const access_token = VueCookies.get("9p_access_token")

            if (access_token) {
                return requests.getUser(access_token)
                    .then(response => {
                        this.user = response.data
                        console.log("rcvd user data", this.user)
                        return response.data
                    })
                    .catch(error => {
                        console.log("issue gettign user data", error.response.data.detail)
                        this.messages.push({ message: error.response.data.detail, error: true })
                        setTimeout(() => this.messages.shift(), 5000)
                    })
            } else {
                console.log("getUserAction access_token error")
            }
        },
        async createPanelAction(title) {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.postPanel(access_token, title)
                await this.getPanelsAction()
            } catch (error) {
                this.messages.push({ message: error.response.data.detail, error: true })
                setTimeout(() => this.messages.shift(), 5000)
                console.log("createPanelAction error: " + error)
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
                console.log("deletePanelAction error: " + error)
            }
        },
        getPanelsAction() {
            const access_token = VueCookies.get("9p_access_token")
            if (access_token) {
                return requests.getPanels(access_token)
                    .then(response => {
                        console.log(response.status)
                        this.panels = response.data
                        console.log("rcvd user panels", this.panels)
                        return response.data
                    })
                    .catch(error => {
                        console.log("issue gettign user panels", error.response.data.detail)
                        this.messages.push({ message: error.response.data.detail, error: true })
                        setTimeout(() => this.messages.shift(), 5000)
                    })
            } else {
                console.log("getPanelsAction access_token error")
            }
        },
        // getEntriesAction() {
        //     const access_token = VueCookies.get("9p_access_token")
        //     if (access_token) {
        //         return requests.getEntries(access_token)
        //             .then(response => {
        //                 console.log(response.status)
        //                 this.entries = response.data
        //                 console.log("rcvd user entries", this.entries)
        //                 return response.data
        //             })
        //             .catch(error => {
        //                 console.log("issue gettign user entries", error.response.data.detail)
        //                 this.messages.push({ message: error.response.data.detail, error: true })
        //                 setTimeout(() => this.messages.shift(), 5000)
        //             })
        //     } else {
        //         console.log("getEntriesAction access_token error, implementing redirect")
        //     }
        // },
        postEntryAction(panel_id, is_complete) {
            const access_token = VueCookies.get("9p_access_token")
            console.log('passed values to postEntryAction: ', panel_id, is_complete)
            if (access_token) {
                return requests.postEntry(access_token, panel_id, is_complete)
                    .then(response => {
                        console.log(response.status)
                        console.log("posted user entry with id:", response.data.id)
                        this.getPanelsAction()
                        return response.data
                    })
                    .catch(error => {
                        console.log("issue posting user entry", error.response.data.detail)
                        this.messages.push({ message: error.response.data.detail, error: true })
                        setTimeout(() => this.messages.shift(), 5000)
                    })
            } else {
                console.log("postEntryAction access_token error, implementing redirect")
            }
        }

    }
},
)