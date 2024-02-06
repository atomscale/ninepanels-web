// user CRUD language throughout
// anything not related to CRUD ops on state should be refactored
// make all async

import { defineStore } from 'pinia'

import api from '@/services/api.js'
import { useMainStore } from "@/stores/store.js"

import { getRandomElement, getAccessToken, apiError } from "@/utils/utils.js"


// temp until all cross store actions are coordianted in utils



export const usePanelStore = defineStore({
    id: 'panel',
    state: () => ({
        panels: null,
        consistency: [],
        panelIsDisabled: false
    }),
    actions: {
        async signOut() {
            this.panels = null
            this.consistency = []
        },
        // move to utils?
        checkAllComplete() {
            if (this.panels.length > 0) {
                const numPanels = this.panels.length
                let numComplete = 0


                for (let i = 0; i < numPanels; i++) {
                    if (this.panels[i].is_complete) {
                        numComplete++
                    }
                }

                if (numComplete === numPanels) {
                    const mainStore = useMainStore()
                    const congratsMsgs = [
                        "🔥 💪 😎",
                        "😎 😎 😎",
                        "🚀 🚀 🚀",
                    ]
                    mainStore.showMessage(getRandomElement(congratsMsgs))

                }
            }
        },
        async createPanelAction(position, title, description) {
            const access_token = getAccessToken()
            try {
                await api.postPanel(access_token, position, title, description)
                await this.readPanelsAction()
            } catch (error) {
                apiError(error)
            }
        },
        async readPanelsAction() {
            const access_token = getAccessToken()

            try {
                const response = await api.getPanels(access_token)
                this.panels = response.data.data
                return response.data.data
            } catch (error) {
                apiError(error)
            }
        },
        async updatePanelAction(panel_id, update) {
            const access_token = getAccessToken()
            try {

                // TODO the PATCH response is the updated panel, so should
                // just update the panel state accordingly, minising api calls
                await api.patchPanel(access_token, panel_id, update)
                // updated panel is response, remove this
                await this.readPanelsAction()
                // unsure how this wuill play, will become obvious soon
                await this.readPanelConsistencyAction()
                return true
            } catch (error) {
                apiError(error)
                return false
            }
        },
        async deletePanelAction(panel_id) {
            const access_token = getAccessToken()

            try {
                await api.deletePanel(access_token, panel_id)
                await this.readPanelsAction()
            } catch (error) {
                apiError(error)
            }
        },
        async createEntryAction(panel_id, is_complete) {
            const access_token = getAccessToken()
            try {
                const response = await api.postEntry(access_token, panel_id, is_complete)
                await this.readPanelsAction()
                return response.data.data
            } catch (error) {
                apiError(error)
            }
        },
        async readEntriesAction(panel_id) {
            // probably replaced by incomg get graph stuff
            const access_token = getAccessToken()

            try {
                const response = await api.getEntries(access_token, panel_id)
                return response.data.data
            } catch (error) {
                apiError(error)
            }
        },
        async deleteEntriesAction(panel_id) {
            const access_token = getAccessToken()

            try {
                await api.deleteEntries(access_token, panel_id)
                await this.readPanelsAction()
            } catch (error) {
                apiError(error)
            }
        },
        async readPanelConsistencyAction() {
            const access_token = getAccessToken()

            try {
                const response = await api.getPanelConsistency(access_token)
                this.consistency = response.data.data
            } catch (error) {
                apiError(error)
            }
        },
        async toggleEntryOptimistically(panelId) {

            const panel = this.panels.find(panel => panel.id === panelId)

            // intial optimistic toggle
            panel.is_complete = !panel.is_complete

            // is this needed? don't think so
            // this.selectedPanel = panelId

            // ensure panel is waiting
            this.panelIsDisabled = true


            try {

                await this.createEntryAction(panelId, panel.is_complete)

                this.checkAllComplete()
                await this.readPanelConsistencyAction()
            } catch (error) {
                // TODO this error message maybe should be trigggered in another layer, check, think
                mainStore = useMainStore()
                mainStore.showMessage("Having trouble updating that panel")

                // toggle panel complete status back again if call fails.
                if (this.panels) {
                    const panel = this.panels.find(panel => panel.id === panelId)
                    panel.is_complete = !panel.is_complete
                }
            } finally {
                this.panelIsDisabled = false
            }
        },

    }
})