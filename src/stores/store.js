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
        leftNavIsOpen: false
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

            var access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.deleteUser(access_token)
                console.log(response.data)
                this.signUserOutAction()
                return true
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
        },
        getUserAction() {

            var access_token = VueCookies.get("9p_access_token")

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
                console.log("getUserAction access_token error, implementing redirect")
                // this.messages.push({ message: "no access_token, redirect sign in", error: true })
                // setTimeout(() => this.messages.shift(), 5000)
            }
        },
        getPanelsAction() {

            var access_token = VueCookies.get("9p_access_token")

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
                console.log("getPanelsAction access_token error, implementing redirect")
                // this.messages.push({ message: "no access_token, redirect sign in", error: true })
                // const router = useRouter()
                // router.push("SignIn")
                // setTimeout(() => this.messages.shift(), 5000)
            }
        },
        getEntriesAction() {

            var access_token = VueCookies.get("9p_access_token")

            if (access_token) {
                return requests.getEntries(access_token)
                    .then(response => {
                        console.log(response.status)
                        this.entries = response.data
                        console.log("rcvd user entries", this.entries)
                        return response.data
                    })
                    .catch(error => {
                        console.log("issue gettign user entries", error.response.data.detail)
                        this.messages.push({ message: error.response.data.detail, error: true })
                        setTimeout(() => this.messages.shift(), 5000)
                    })
            } else {
                console.log("getEntriesAction access_token error, implementing redirect")
                // this.messages.push({ message: "no access_token, redirect sign in", error: true })
                // const router = useRouter()
                // router.push("SignIn")
                // setTimeout(() => this.messages.shift(), 5000)
            }
        },
        postEntryAction(panel_id, is_complete) {
            var access_token = VueCookies.get("9p_access_token")

            if (access_token) {
                return requests.postEntry(access_token, panel_id, is_complete)
                    .then(response => {
                        console.log(response.status)
                        // this.entries = response.data
                        console.log("posted user entry with id:", response.data.id)
                        this.getEntriesAction()
                        return response.data
                    })
                    .catch(error => {
                        console.log("issue posting user entry", error.response.data.detail)
                        this.messages.push({ message: error.response.data.detail, error: true })
                        setTimeout(() => this.messages.shift(), 5000)
                    })
            } else {
                console.log("postEntryAction access_token error, implementing redirect")
                // this.messages.push({ message: "no access_token, redirect sign in", error: true })
                // const router = useRouter()
                // router.push("SignIn")
                // setTimeout(() => this.messages.shift(), 5000)
            }
        }

    }
},
)