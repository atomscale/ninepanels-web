import { defineStore } from 'pinia'
import requests from '@/services/requests.js'
import VueCookies from 'vue-cookies'
import rollbar from '@/rollbarClient.js'

const uniqueMessages = new Set()

export const useStore = defineStore({
    id: '',
    state: () => ({
        user: null,
        panels: [],
        consistency: [],

        messages: [],

        loadingBar: false,

        isPWA: false,
        isMobile: false,

        leftNavIsOpen: false,

        primaryTrayIsOpen: false,
        primaryComponentName: null,
        primaryComponentProps: {},

        secondaryTrayIsOpen: false,

        panelIsDisabled: false,

        panelSortBoxIsOpen: false,

        panelTitleEditState: false,
        panelDescEditState: false,
        deleteResetBoxIsOpen: false,

        visGridIsOpen: false,


        shareBoxIsOpen: false,

        passwordResetRequested: false,

        theme: '',

        currentAnnouncementVersion: 3,
        canShow: false

    }),
    actions: {

        checkPWA() {
            this.isPWA = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
        },
        checkMobile() {
            this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        },
        reloadApp() {
            this.loadingBar = true
            window.location.reload()
            this.loadingBar = true

        },
        openTray() {
            this.primaryTrayIsOpen = true
        },
        readTheme() {
            const theme = localStorage.getItem('theme')
            if (theme) {
                this.theme = theme
            } else {
                this.theme = 'dusk'
            }
        },
        saveTheme(newTheme) {
            // rollbar.info(this.Store.user.name + "set theme to " + newTheme)
            localStorage.setItem('theme', newTheme)
        },
        apiError(error) {
            let errorMsg = "Unknown error...  😬"

            if (error.response) {
                // catch errors if response code is outwith 2xx range
                const status = error.response.status
                if (status === 0) {
                    // this handles rollbar clients errors on network unavailability
                    errorMsg = "Network error"
                } else if (status === 422) {
                    // handle a pydatic validation error
                    errorMsg = error.response.data && error.response.data.detail ? error.response.data.detail[0].msg : `Server is saying ${status}`
                } else {
                    // handle other error responses from server
                    errorMsg = error.response.data && error.response.data.detail ? error.response.data.detail : `Server is saying ${status}`
                }

            } else if (error.request) {
                // capture request errors like when network not available
                // if this block fires it's becuase no response object was recvd
                errorMsg = "Unable to reach the 9P servers?"
            }

            if (!uniqueMessages.has(errorMsg)) {
                uniqueMessages.add(errorMsg)

                this.messages.push({ message: errorMsg, error: true })

                setTimeout(() => {
                    uniqueMessages.delete(errorMsg)
                    this.messages.shift()
                }, 5000)
            }
        },
        async getLoginTokenAction(email, password) {
            this.loadingBar = true
            try {
                const response = await requests.getLoginToken(email, password)
                VueCookies.set('9p_access_token', response.data.access_token, '30d', '', '', 'true')
                await this.readUserAction()
                if (this.user.name) {
                    rollbar.info(this.user.name + " logged in. using PWA: " + this.isPWA + " on mobile: " + this.isMobile)
                }
                return response.data.access_token
            } catch (error) {
                this.apiError(error)
            } finally {
                this.loadingBar = false
            }
        },
        async deleteUserAction() {
            const access_token = VueCookies.get("9p_access_token")
            this.loadingBar = true
            try {
                const response = await requests.deleteUser(access_token)
                this.signUserOutAction()
            } catch (error) {
                this.apiError(error)
            } finally {
                this.loadingBar = false
            }
        },
        signUserOutAction() {
            try {
                VueCookies.remove("9p_access_token")
            } catch (error) {
                console.log("no cookie to remove")
            }
            this.user = null
            this.panels = []
            this.consistency = []
            this.messages = []
        },
        async createUserAction(email, name, password) {
            const access_token = VueCookies.get("9p_access_token")
            // rollbar.info("New user " + name + " signed up on the app")
            try {
                const response = await requests.postUser(access_token, email, name, password)
                await this.getLoginTokenAction(email, password)
                return true
            } catch (error) {
                this.apiError(error)
                return false
            }
        },
        async readUserAction() {

            const access_token = VueCookies.get("9p_access_token")
            if (access_token) {
                this.loadingBar = true

                try {
                    const response = await requests.getUser(access_token)
                    this.user = response.data
                    return response.data
                } catch (error) {
                    this.apiError(error)
                } finally {
                    this.loadingBar = false
                }
            }
        },
        async createPanelAction(position, title, description) {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.postPanel(access_token, position, title, description)
                await this.readPanelsAction()
            } catch (error) {
                this.apiError(error)
            }
        },
        async updatePanelAction(panel_id, update) {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.patchPanel(access_token, panel_id, update)
                await this.readPanelsAction()
                return true
            } catch (error) {
                this.apiError(error)
                return false
            }
        },
        async deletePanelAction(panel_id) {
            const access_token = VueCookies.get("9p_access_token")
            this.loadingBar = true
            try {
                const response = await requests.deletePanel(access_token, panel_id)
                await this.readPanelsAction()
            } catch (error) {
                this.apiError(error)
            } finally {
                this.loadingBar = false
            }
        },
        async readPanelsAction() {
            const access_token = VueCookies.get("9p_access_token")
            this.loadingBar = true
            try {
                const response = await requests.getPanels(access_token)
                this.panels = response.data
                return response.data
            } catch (error) {
                this.apiError(error)
            } finally {
                this.loadingBar = false
            }
        },
        async createEntryAction(panel_id, is_complete) {
            const access_token = VueCookies.get("9p_access_token")
            // does not require loading bars becuase they are triggered in getPanelsActions()
            try {
                const response = await requests.postEntry(access_token, panel_id, is_complete)
                await this.readPanelsAction()
                return response.data
            } catch (error) {
                this.apiError(error)
            }
        },
        async deleteEntriesAction(panel_id) {
            const access_token = VueCookies.get("9p_access_token")
            this.loadingBar = true
            try {
                const response = await requests.deleteEntries(access_token, panel_id)
                await this.readPanelsAction()
            } catch (error) {
                this.apiError(error)
            } finally {
                this.loadingBar = false
            }
        },
        async readPanelConsistencyAction() {
            const access_token = VueCookies.get("9p_access_token")

            try {
                const response = await requests.getPanelConsistency(access_token)
                this.consistency = response.data
            } catch (error) {
                this.apiError(error)
            }
        },
        async toggleEntryOptimistically(panelId) {
            const panel = this.panels.find(panel => panel.id === panelId)

            panel.is_complete = !panel.is_complete
            this.loadingBar = true
            this.panelIsDisabled = true

            try {
                await this.createEntryAction(panelId, panel.is_complete)
                this.readPanelConsistencyAction()
            } catch (error) {
                this.messages.push({ message: 'Having trouble updating that panel... 😬', error: true })
                setTimeout(() => this.messages.shift(), 5000)
                const panel = this.panels.find(panel => panel.id === panelId)
                panel.is_complete = !panel.is_complete
            } finally {
                this.panelIsDisabled = false
                this.loadingBar = false
            }
        },
        async startPasswordResetFlow(email) {
            this.loadingBar = true
            try {
                const response = await requests.postPasswordResetRequest(email)
                if (response.status == 200) {
                    this.messages.push({ message: 'Sent you the password reset email...', error: false })
                    setTimeout(() => this.messages.shift(), 7000)
                    return true
                } else {
                    this.messages.push({ message: 'Something went wrong... email me!', error: true })
                    setTimeout(() => this.messages.shift(), 7000)
                    return false
                }
            } catch (error) {
                this.apiError(error)
            } finally {
                this.loadingBar = false
            }
        },
        async sendPasswordReset(password, email, password_reset_token) {
            this.loadingBar = true
            try {
                const response = await requests.postPasswordReset(password, email, password_reset_token)
                if (response.status == 200) {
                    this.messages.push({ message: 'Password successfully reset. Please sign in', error: false })
                    setTimeout(() => this.messages.shift(), 5000)
                    return true
                } else {
                    this.messages.push({ message: 'Something went wrong... email me!', error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                    return false
                }
            } catch (error) {
                this.apiError(error)
            } finally {
                this.loadingBar = false
            }
        },
    }
})