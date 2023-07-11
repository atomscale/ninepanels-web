<template>

    <div class="bg-white">
        <div class="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
            <div class="mx-auto max-w-3xl text-center space-y-2 lg:max-w-none">
                <h2 class="text-xl font-semibold leading-6 text-blue-400">Features</h2>
                <h2 class="text-3xl font-bold tracking-tight text-gray-900">All-in-one product</h2>
                <p class="mt-4 text-lg text-gray-500">The product's core tagline here, probably a longer sentence to really show what it can do</p>
            </div>
            <dl
                class="mt-12 space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-4 lg:gap-x-8">
                <div v-for="feature in features" :key="feature.name" class="relative">
                    <dt>
                        <CheckIcon class="absolute h-6 w-6 text-green-500" aria-hidden="true" />
                        <p class="ml-9 text-lg font-medium leading-6 text-gray-900">{{ feature.name }}</p>
                    </dt>
                    <dd class="mt-2 ml-9 text-base text-gray-500">{{ feature.description }}</dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline'

const features = [
    {
        name: 'Know true costs',
        description: 'Combined view of all annual, regular and one-off costs.',
    },
    {
        name: 'Fuel spend tracking',
        description: 'Understand the core ongoing expense of your car like never before',
    },
    {
        name: 'EV cost comparison',
        description: 'See if your current fule spend woudl be reduce by swtichign to an EV',
    },
    {
        name: 'Boards',
        description: 'Interdum quam pulvinar turpis tortor, egestas quis diam amet, natoque. Mauris sagittis.',
    },
    {
        name: 'Keyboard shortcuts',
        description: 'Ullamcorper in ipsum ac feugiat. Senectus at aliquam vulputate mollis nec. In at risus odio.',
    },
    {
        name: 'Reporting',
        description: 'Magna a vel sagittis aliquam eu amet. Et lorem auctor quam nunc odio. Sed bibendum.',
    },
    {
        name: 'Calendars',
        description: 'Sed mi, dapibus turpis orci posuere integer. A porta viverra posuere adipiscing turpis.',
    },
    {
        name: 'Mobile app',
        description: 'Quisque sapien nunc nisl eros. Facilisis sagittis maecenas id dignissim tristique proin sed.',
    },
]
</script>