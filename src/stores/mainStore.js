import { defineStore } from 'pinia'
import preAuth from '../services/preAuth.js'
import VueCookies from 'vue-cookies'
import { useRouter } from 'vue-router'

export const useMainStore = defineStore({
    id: 'main', // this is the first part + Store
    state: () => ({
        panels: '',
        messages: [],
    }),
    actions: {
        getLoginToken(email, password) {
            return preAuth.getLoginToken(email, password)
                .then(response => {
                    console.log(response.data.access_token)
                    VueCookies.set('9p_access_token', response.data.access_token, '30d', '', '', 'true')
                    this.messages.push({ message: "Logged in", error: false })
                    setTimeout(() => this.messages.shift(), 5000)
                    return response.data.access_token
                })
                .catch(error => {
                    console.log("issue gettign access token", error)
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                })
        },
        getPanels() {

            var access_token = VueCookies.get("9p_access_token")

            if (access_token) {
                return preAuth.getPanels(access_token)
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
                console.log("getPanels access_token error, implementing redirect")
                this.messages.push({ message: "no access_token, redirect sign in", error: true })
                const router = useRouter()
                router.push("SignIn")
                setTimeout(() => this.messages.shift(), 5000)
            }
        }

    }
},
)