import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueScrollTo from 'vue-scrollto'

import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'
import './index.css'

import "nprogress/nprogress.css";
import "@/assets/css/nprogcustom.css"
import "@/assets/css/custom.css"

import NProgress from 'nprogress'

NProgress.configure({ minimum: 0.3 })
NProgress.configure({ trickleRate: 0.2, trickleSpeed: 400 });

const app = createApp(App)
const pinia = createPinia()


app.use(router)
app.use(pinia)

app.use(VueScrollTo)
app.use(VueCookies, {'expires': '30d'})

app.mount('#app')
