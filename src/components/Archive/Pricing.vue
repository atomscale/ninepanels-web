<template>
    <div class="bg-gray-800">
      <div class="pt-16 sm:pt-16 lg:pt-24">
        <div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div class="mx-auto max-w-3xl space-y-2 lg:max-w-none">
            <h2 class="text-xl font-semibold leading-6 text-gray-300">Pricing</h2>
            <p class="text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl lg:text-5xl">The right price for you, whoever you are</p>
            <p class="text-xl text-gray-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sequi unde repudiandae natus.</p>
          </div>
        </div>
      </div>
      <div class="mt-8 bg-gray-50 pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
        <div class="relative">
          <div class="absolute inset-0 h-3/4 bg-gray-800" />
          <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-md space-y-4 lg:grid lg:max-w-5xl lg:grid-cols-2 lg:gap-5 lg:space-y-0">
              <div v-for="tier in tiers" :key="tier.name" class="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div class="bg-gray-50 px-6 py-8 sm:p-10 sm:pb-6">
                  <div>
                    <h3 class="inline-flex rounded-full bg-gray-200 px-4 py-1 text-base font-semibold text-blue-400" id="tier-standard">{{ tier.name }}</h3>
                  </div>
                  <div class="mt-4 flex items-baseline text-6xl font-bold tracking-tight">
                    £{{ tier.priceMonthly }}
                    <span class="ml-1 text-2xl font-medium tracking-normal text-gray-500">/mo</span>
                  </div>
                  <p class="mt-5 text-lg text-gray-500">{{ tier.description }}</p>
                </div>
                <div class="flex flex-1 flex-col justify-between space-y-6 bg-gray-50 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                  <ul role="list" class="space-y-4">
                    <li v-for="feature in tier.features" :key="feature" class="flex items-start">
                      <div class="flex-shrink-0">
                        <CheckIcon class="h-6 w-6 text-green-500" aria-hidden="true" />
                      </div>
                      <p class="ml-3 text-base text-gray-700">{{ feature }}</p>
                    </li>
                  </ul>
                  <div class="rounded-md shadow">
                    <a :href="tier.href" class="flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-5 py-3 text-base font-medium text-white hover:bg-gray-900" aria-describedby="tier-standard">Get started</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </template>

  <script setup>
  import { CheckIcon } from '@heroicons/vue/24/outline'

  const tiers = [
    {
      name: 'Free Forever',
      href: '#',
      priceMonthly: 0,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      features: [
        'Pariatur quod similique',
        'Sapiente libero doloribus modi nostrum',
        'Vel ipsa esse repudiandae excepturi',
        'Itaque cupiditate adipisci quibusdam',
      ],
    },
    {
      name: 'Electro',
      href: '#',
      priceMonthly: 2,
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      features: [
        'Pariatur quod similique',
        'Sapiente libero doloribus modi nostrum',
        'Vel ipsa esse repudiandae excepturi',
        'Itaque cupiditate adipisci quibusdam',
      ],
    },
  ]
  </script>