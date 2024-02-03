import { defineStore } from 'pinia'
import requests from '@/services/requests.js'
import VueCookies from 'vue-cookies'
import rollbar from '@/rollbarClient.js'


const uniqueMessages = new Set()

export const useStore = defineStore({
    id: '',
    state: () => ({
        user: null,
        panels: null,
        consistency: [],
        routePerformance: null,

        window_size: null,

        messages: [],

        isPWA: false,
        isMobile: false,

        leftNavIsOpen: false,

        rightTrayIsOpen: false,
        rightTrayComponentName: null,
        rightTrayComponentProps: null,
        rightTrayBackNavComponent: null,
        rightTrayBackNavProps: null,

        secondaryTrayIsOpen: false,

        panelIsDisabled: false,

        panelSortBoxIsOpen: false,

        panelTitleEditState: false,
        panelDescEditState: false,
        deleteResetBoxIsOpen: false,

        visGridIsOpen: true,

        shareBoxIsOpen: false,

        theme: '',

        appVersion: "5.2.0",

        performanceArray: [],

        selectedPanel: null,

    }),
    actions: {
        splitSemVer(semver) {

            const elem = semver.split(".")

            const majorMinor = elem.slice(0, 2)

            const versionNumStr = majorMinor.join('.')

            let versionNum = parseFloat(versionNumStr)

            return versionNum
        },
        checkAppVersion() {
            const oldVersion = localStorage.getItem('hiddenAnnoucementVersion')

            if (oldVersion) {
                localStorage.clear()
            }

            const verInStorage = localStorage.getItem('localAppVersion')
            // the ui logic is that a Releases Tray is shown if the major or minor number bumps
            // the major must stay in sync with the api major.
            // backend and front end sync and agree on major version number only
            // front end diplays relases tray on major or minor bump.
            // frotn end will not dsiplay releases tray on patch bump

            if (!verInStorage) {
                this.openRightTray('HelpTray')
                localStorage.setItem('localAppVersion', this.appVersion)
                return
            }
            const localVersionNum = this.splitSemVer(verInStorage)
            const currentVersionNum = this.splitSemVer(this.appVersion)


            if (currentVersionNum > localVersionNum) {
                this.openRightTray('ReleasesTray')
            }
            localStorage.setItem('localAppVersion', this.appVersion)

        },
        addPerfMetric(perfMeasure) {
            this.performanceArray.push(perfMeasure)
            // console.log(`perfmeasure of ${perfMeasure} added`)

            const perfWindow = 4
            if (this.performanceArray.length >= perfWindow) {
                // take avg and send to rollbar

                if (this.performanceArray.every(Number.isInteger)) {

                    const sum = this.performanceArray.reduce((acc, curr) => acc + curr, 0)
                    const avg = this.performanceArray.length ? sum / this.performanceArray.length : 0
                    // console.log(`avg resp times for ${this.user.name} across ${perfWindow} calls is ${avg}ms`)
                    this.performanceArray = []
                    // console.log(`perf array reset`)

                    if (avg > 1000) {
                        rollbar.warn(`app: individual tap for ${this.user.name} > 1000ms`)
                    }
                }

            }

        },
        openRightTray(component, props, backNavComponent, backNavProps) {
            this.leftNavIsOpen = false
            this.rightTrayIsOpen = true
            this.rightTrayComponentName = component
            this.rightTrayComponentProps = props
            this.rightTrayBackNavComponent = backNavComponent
            this.rightTrayBackNavProps = backNavProps
        },
        closeRightTray() {
            this.rightTrayIsOpen = false
            this.rightTrayComponentName = null
            this.rightTrayComponentProps = null
            this.rightTrayBackNavComponent = null
            this.rightTrayBackNavProps = null
            this.panelTitleEditState = false
            this.panelDescEditState = false
            this.deleteResetBoxIsOpen = false
            localStorage.setItem('localAppVersion', this.appVersion)
        },
        checkAllComplete() {
            if (this.panels.length > 0) {
                const numPanels = this.panels.length
                let numComplete = 0
                const getRandomElement = (arr) => {
                    const randomIndex = Math.floor(Math.random() * arr.length);
                    return arr[randomIndex];
                }
                const congratsMsgs = [
                    "🔥 💪 😎",
                    "😎 😎 😎",
                    "🚀 🚀 🚀",
                ]

                for (let i = 0; i < numPanels; i++) {
                    if (this.panels[i].is_complete) {
                        numComplete++
                    }
                }

                if (numComplete === numPanels) {
                    this.showMessage(getRandomElement(congratsMsgs))

                }
            }
        },
        checkPWA() {
            this.isPWA = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
        },
        checkMobile() {
            this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        },
        reloadApp() {

            window.location.reload()


        },
        readTheme() {
            const localTheme = localStorage.getItem('theme')
            if (localTheme) {
                this.theme = localTheme
            } else {
                this.theme = 'dusk'
            }
        },
        saveTheme(newTheme) {
            localStorage.setItem('theme', newTheme)
        },
        showMessage(message) {
            if (!uniqueMessages.has(message)) {
                uniqueMessages.add(message)

                this.messages.push({ message: message })

                setTimeout(() => {
                    uniqueMessages.delete(message)
                    this.messages.shift()
                }, 5000)
            }
        },
        async apiError(error) {
            let errorMsg = "Unknown error...  😬"

            if (error.response) {
                // catch errors if response code is outwith 2xx range
                const status = error.response.status
                if (status === 0) {
                    // this handles rollbar clients errors on network unavailability
                    errorMsg = "Having trouble reaching the servers... ☹️"

                    rollbar.error(`app: network error for a user`)
                    this.signUserOutAction()
                } else if (status === 401) {
                    errorMsg = "Please sign back in."
                    // console.log("401", error.response.data.error_message)
                    await this.signUserOutAction()
                    setTimeout(() => { }, 1000)

                }
                else {
                    // console.log(error.response)
                    errorMsg = error.response.data.data && error.response.data.is_error ? error.response.data.error_message : `Server is saying ${status}`
                }

            } else if (error.request) {
                // capture request errors like when network not available
                // if this block fires it's becuase no response object was recvd
                errorMsg = "Unable to reach the 9P servers?"
            }

            this.showMessage(errorMsg)
        },
        async getLoginTokenAction(email, password) {

            try {
                const response = await requests.getLoginToken(email, password)
                VueCookies.set('9p_access_token', response.data.data.access_token, '30d', '', '', 'true')
                await this.readUserAction()
                if (this.user.name) {
                    rollbar.info(`app: ${this.user.name} logged in. using PWA: ${this.isPWA}  on mobile:  ${this.isMobile}`)
                }
                return response.data.data.access_token
            } catch (error) {
                if (error.response.status === 401) {
                    // console.log("401 in sign up comp")
                    this.showMessage('Incorrect email or password.')
                } else {

                    this.apiError(error)
                }
            } finally {

            }
        },
        async deleteUserAction() {
            const access_token = VueCookies.get("9p_access_token")

            try {
                const response = await requests.deleteUser(access_token)
                this.user = null
                this.panels = null
                this.signUserOutAction()
                localStorage.clear()
            } catch (error) {
                this.apiError(error)
            }
        },
        async signUserOutAction() {
            // console.log("sign user out action")
            try {
                VueCookies.remove("9p_access_token")
                // console.log("removed acceess token")
            } catch (error) {
                // console.log("no cookie to remove")
            }
            this.user = null
            this.panels = null
            this.consistency = []
            this.rightTrayIsOpen = false
            this.rightTrayComponentName = null
            this.rightTrayComponentProps = {}
            this.leftNavIsOpen = false
            this.shareBoxIsOpen = false
            this.secondaryTrayIsOpen = false
        },
        async createUserAction(email, name, password) {
            const access_token = VueCookies.get("9p_access_token")

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


                try {
                    const response = await requests.getUser(access_token)
                    this.user = response.data.data
                    return response.data.data
                } catch (error) {
                    this.apiError(error)
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
        async readPanelsAction() {
            const access_token = VueCookies.get("9p_access_token")

            try {
                const response = await requests.getPanels(access_token)
                this.panels = response.data.data
                return response.data.data
            } catch (error) {
                this.apiError(error)
            }
        },
        async updatePanelAction(panel_id, update) {
            const access_token = VueCookies.get("9p_access_token")
            try {

                const response = await requests.patchPanel(access_token, panel_id, update)
                await this.readPanelsAction()
                await this.readPanelConsistencyAction()
                return true
            } catch (error) {
                this.apiError(error)
                return false
            }
        },
        async deletePanelAction(panel_id) {
            const access_token = VueCookies.get("9p_access_token")

            try {
                const response = await requests.deletePanel(access_token, panel_id)
                await this.readPanelsAction()
            } catch (error) {
                this.apiError(error)
            }
        },
        async createEntryAction(panel_id, is_complete) {
            const access_token = VueCookies.get("9p_access_token")
            // does not require loading bars becuase they are triggered in getPanelsActions()
            try {
                const response = await requests.postEntry(access_token, panel_id, is_complete)
                await this.readPanelsAction()
                return response.data.data
            } catch (error) {
                this.apiError(error)
            }
        },
        async readEntriesAction(panel_id) {
            const access_token = VueCookies.get("9p_access_token")

            try {
                const response = await requests.getEntries(access_token, panel_id)
                return response.data.data
            } catch (error) {
                this.apiError(error)
            }
        },
        async deleteEntriesAction(panel_id) {
            const access_token = VueCookies.get("9p_access_token")

            try {
                const response = await requests.deleteEntries(access_token, panel_id)
                await this.readPanelsAction()
            } catch (error) {
                this.apiError(error)
            }
        },
        async readPanelConsistencyAction() {
            const access_token = VueCookies.get("9p_access_token")

            try {
                performance.mark('panelConsistencyStart')
                const response = await requests.getPanelConsistency(access_token)
                this.consistency = response.data.data
            } catch (error) {
                this.apiError(error)
            } finally {
                performance.mark('panelConsistencyEnd')
                performance.measure('panelConsistencyDuration', 'panelConsistencyStart', 'panelConsistencyEnd')

                const consistencyDuration = performance.getEntriesByName('panelConsistencyDuration')
                // console.log(`panel consistency duration ${consistencyDuration[consistencyDuration.length - 1].duration} ms`)
            }
        },
        async toggleEntryOptimistically(panelId) {
            performance.mark('panelTapStart')
            performance.mark('panelFindStart')
            const panel = this.panels.find(panel => panel.id === panelId)
            performance.mark('panelFindEnd')

            panel.is_complete = !panel.is_complete
            this.selectedPanel = panelId

            this.panelIsDisabled = true


            try {
                performance.mark('panelEntryStart')
                await this.createEntryAction(panelId, panel.is_complete)
                performance.mark('panelEntryEnd')
                this.checkAllComplete()
                this.readPanelConsistencyAction()
            } catch (error) {
                this.messages.push({ message: 'Having trouble updating that panel... 😬', error: true })
                setTimeout(() => this.messages.shift(), 5000)
                if (this.panels) {
                    const panel = this.panels.find(panel => panel.id === panelId)
                    panel.is_complete = !panel.is_complete
                }
            } finally {
                this.panelIsDisabled = false

                performance.mark('panelTapEnd')
                performance.measure('panelFindDuration', 'panelFindStart', 'panelFindEnd')
                performance.measure('panelEntryDuration', 'panelEntryStart', 'panelEntryEnd')
                performance.measure('panelPanelDuration', 'panelTapStart', 'panelTapEnd')

                const findDuration = performance.getEntriesByName('panelFindDuration')
                // console.log(`panel find duration ${findDuration[findDuration.length - 1].duration} ms`)

                const entryDuration = performance.getEntriesByName('panelEntryDuration')
                // console.log(`panel entry duration ${entryDuration[entryDuration.length - 1].duration} ms`)

                const tapDuration = performance.getEntriesByName('panelPanelDuration')
                const tapDurationMs = tapDuration[tapDuration.length - 1].duration
                // console.log(`panel tap duration ${tapDurationMs} ms`)
                this.addPerfMetric(tapDurationMs)

                if (tapDurationMs > 1500) {
                    rollbar.warn(`app: individual tap for ${this.user.name} > 1500ms`)
                }
            }
        },
        async startPasswordResetFlow(email) {

            try {
                const response = await requests.postPasswordResetRequest(email)
                if (response.status == 200) {
                    this.messages.push({ message: 'Sent you the link by email...', error: false })
                    setTimeout(() => this.messages.shift(), 7000)
                    return true
                } else {
                    this.messages.push({ message: 'Something went wrong... email me!', error: true })
                    setTimeout(() => this.messages.shift(), 7000)
                    return false
                }
            } catch (error) {
                this.apiError(error)
            }
        },
        async sendPasswordReset(password, email, password_reset_token) {
            const response = await requests.postPasswordReset(password, email, password_reset_token)
            if (response.status == 200) {
                return
            }
            throw new Error('error in postPasswordReset')
        },
        async readRoutePerformance() {
            const access_token = VueCookies.get("9p_access_token")


            try {

                const response = await requests.getRoutePerformance(access_token)
                this.routePerformance = response.data
                // return response.data.data
            } catch (error) {
                this.apiError(error)
            }
        },
        async readRouteTimings(method_path, window_size) {
            const access_token = VueCookies.get("9p_access_token")


            try {

                const response = await requests.getRouteTimings(access_token, method_path, window_size)
                if (response) {
                    // console.log(response.data.data)
                    return response.data.data
                }
                // return response.data.data
            } catch (error) {
                this.apiError(error)
            }
        },
    }
})