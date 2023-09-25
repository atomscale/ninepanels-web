<template>
    <div class="flex justify-between items-center ">
        <div class="text-np-base text-sm">
            Theme
        </div>


            <Listbox as="div" v-model="Store.theme">
                <div class="relative border border-np-base rounded-md">

                    <ListboxButton
                        class="relative w-full cursor-default  py-1.5 pl-3 pr-10 text-left text-np-base text-sm ">
                        <span class="block truncate">{{ Store.theme }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-np-base" aria-hidden="true" />
                        </span>
                    </ListboxButton>
                    <ListboxOptions class="absolute z-40 mt-1 max-h-60 w-40 border border-np-base right-0 rounded-md bg-np-base py-1 text-sm">
                        <ListboxOption v-for="colour in colours" :key="colour" :value="colour"
                            v-slot="{ active, selected }">
                            <li
                                :class="[active ? 'bg-np-fill text-np-inverted' : 'text-np-base', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                <span :class="[selected ? 'font-bold' : 'font-light', 'block-truncate']">{{ colour }}</span>
                                <span v-if="selected"
                                    :class="[active ? 'text-np-inverted' : 'text-np-base', 'absolute inset-y-0 right-0 flex items-center pr-2']">
                                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </div>
            </Listbox>



    </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import rollbar from '@/rollbarClient.js'


import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/24/outline'

export default {
    computed: {
        ...mapStores(useStore),
        currentTheme() {
            return this.Store.theme
        }
    },
    watch: {
        currentTheme() {
            this.Store.saveTheme(this.Store.theme)
        }
    },

    components: {
        Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, CheckIcon, ChevronUpDownIcon
    },
    data() {
        return {
            colours: [
                'dusk',
                'ocean',
                'sky',
                'autumn',
                'night'
            ],


        }
    }

}
</script>