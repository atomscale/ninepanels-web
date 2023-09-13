<template >
    <div class="flex items-center justify-center p-4 ">
        <div class="grid grid-cols-3 gap-1 w-2/5 mx-auto">
            <div v-for="i in 9" :key="i" class="aspect-w-1 aspect-h-1 rounded-lg">
                <div class="aspect-content">
                    <button @click="dispatchUpdatePanelAction(i - 1)"
                        :class="[this.Store.panels[i - 1] ? 'border-2 border-np-base' : 'border-dashed border-np-base', this.Store.panels[i - 1] && this.Store.panels[i - 1].id === this.panel.id ? 'bg-np-fill border-0' : null]"
                        class="flex items-center justify-center border  border-np-base rounded-lg hover:scale-105">
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'



export default {
    computed: {
        ...mapStores(useStore),
        panelFromStore() {
            const panelFromStore = this.Store.panels.find(panel => panel.id === this.panel.id)
            return { ...panelFromStore }
        }

    },
    components: {

    },
    props: {
        panel: {
            type: Object,
            required: true
        }
    },
    methods: {
        async dispatchUpdatePanelAction(i) {
            if ((i + 1) <= this.Store.panels.length) {
                if (i === this.panelFromStore.position) {
                    this.Store.messages.push({ message: "That's where the panel already is 🙂", error: true })
                    setTimeout(() => this.Store.messages.shift(), 5000)
                } else {

                    this.Store.primaryTrayIsOpen = false
                    this.Store.panelSortBoxIsOpen = false
                    this.Store.deleteResetBoxIsOpen = false


                    await this.Store.updatePanelAction(
                        this.panel.id,
                        { 'position': i }
                    )
                    this.Store.readPanelConsistencyAction()
                }
            }
            else {
                this.Store.messages.push({ message: "Please move panel within existing panels 🙏", error: true })
                setTimeout(() => this.Store.messages.shift(), 5000)
            }
        }
    }

}

</script>

<style scoped>
.aspect-content {
    position: relative;
    width: 100%;
}

.aspect-content::before {
    content: "";
    display: block;
    padding-top: 100%;
}

.aspect-content>* {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
</style>