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

import RollbarPlugin from './rollbar.js'


// dealing with viewport on mobile shenangigans
const setViewportHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Listeners
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

setViewportHeight();

app.use(router)
app.use(pinia)
app.use(RollbarPlugin)

app.use(VueScrollTo)
app.use(VueCookies, { 'expires': '30d' })

app.mount('#app')
