import { defineStore } from 'pinia'
import requests from '@/services/requests.js'
import VueCookies from 'vue-cookies'
import rollbar from '@/rollbarClient.js'

export const useStore = defineStore({
    id: '',
    state: () => ({
        panels: [],
        messages: [],
        entries: [],
        consistency: [],
        user: null,
        showWelcome: false,
        primaryTrayIsOpen: false,
        secondaryTrayIsOpen: false,
        leftNavIsOpen: false,
        panelSortBoxIsOpen: false,
        primaryComponentName: null,
        primaryComponentProps: {},
        panelTitleEditState: false,
        panelDescEditState: false,
        entryLoading: false,
        loadingBar: false,
        visGridLoading: false,
        visGridIsOpen: false,
        deleteResetBoxIsOpen: false,
        shareBoxIsOpen: false,
        passwordResetRequested: false
    }),
    actions: {
        async getLoginTokenAction(email, password) {
            try {
                const response = await requests.getLoginToken(email, password)
                VueCookies.set('9p_access_token', response.data.access_token, '30d', '', '', 'true')
                await this.getUserAction()
                return response.data.access_token
            } catch (error) {
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
            }
        },
        async deleteUserAction() {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.deleteUser(access_token)
                this.signUserOutAction()
            } catch (error) {
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
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
            // rollbar.info("New user " + name + " signed up on the app")
            try {
                const response = await requests.postUser(access_token, email, name, password)
                await this.getLoginTokenAction(email, password)
                return true
            } catch (error) {
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
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

                        if (error.response.status) {
                            this.messages.push({ message: error.response.data.detail, error: true })
                            setTimeout(() => this.messages.shift(), 5000)
                        } else {
                            this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                            setTimeout(() => this.messages.shift(), 5000)
                        }
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
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
            }
        },
        async updatePanelAction(panel_id, update) {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.patchPanel(access_token, panel_id, update)
                await this.getPanelsAction()
                return true
            } catch (error) {
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
                return false
            }
        },
        async deletePanelAction(panel_id) {
            const access_token = VueCookies.get("9p_access_token")
            try {
                const response = await requests.deletePanel(access_token, panel_id)
                await this.getPanelsAction()
            } catch (error) {
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
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
                        if (error.response.status) {
                            this.messages.push({ message: error.response.data.detail, error: true })
                            setTimeout(() => this.messages.shift(), 5000)
                        } else {
                            this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                            setTimeout(() => this.messages.shift(), 5000)
                        }
                    })
            } else {
                this.messages.push({ message: "Having a bit of trouble getting your panels... 😬", error: true })
                setTimeout(() => this.messages.shift(), 5000)
            }
        },
        async postEntryAction(panel_id, is_complete) {
            const access_token = VueCookies.get("9p_access_token")
            if (!access_token) {
                this.messages.push({ message: "Not authorized", error: true });
                setTimeout(() => this.messages.shift(), 5000);
                return;
            }
            try {
                const response = await requests.postEntry(access_token, panel_id, is_complete)
                await this.getPanelsAction()
                return response.data
            } catch (error) {
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
            }
        },
        async deleteEntriesAction(panel_id) {
            const access_token = VueCookies.get("9p_access_token")
            this.loadingBar = true
            try {
                const response = await requests.deleteEntries(access_token, panel_id)
                await this.getPanelsAction()
            } catch (error) {
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
            } finally {
                this.loadingBar = false
            }
        },
        async getPanelConsistencyAction() {
            const access_token = VueCookies.get("9p_access_token")
            // this.loadingBar = true
            this.visGridLoading = true
            try {
                const response = await requests.getPanelConsistency(access_token)
                this.consistency = response.data
            } catch (error) {
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
            } finally {
                this.visGridLoading = false
                // this.loadingBar = false
            }
        },
        async toggleEntryOptimistically(panelId) {
            const panel = this.panels.find(panel => panel.id === panelId)

            panel.is_complete = !panel.is_complete
            this.loadingBar = true
            this.entryLoading = true

            try {
                await this.postEntryAction(panelId, panel.is_complete)
                this.getPanelConsistencyAction()
            } catch (error) {
                console.log('panel update failed, reverting')
                this.messages.push({ message: 'Having trouble updating that panel... 😬', error: true })
                setTimeout(() => this.messages.shift(), 5000)
                const panel = this.panels.find(panel => panel.id === panelId)
                panel.is_complete = !panel.is_complete
            } finally {
                this.entryLoading = false
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
                if (error.response.status) {
                    this.messages.push({ message: error.response.data.detail, error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                } else {
                    this.messages.push({ message: "An error that is currently not very well understood... 😬", error: true })
                    setTimeout(() => this.messages.shift(), 5000)
                }
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
                this.messages.push({ message: "error in password reset", error: true })
                setTimeout(() => this.messages.shift(), 5000)
            } finally {
                this.loadingBar = false
            }
        },
    }
},
)