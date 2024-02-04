import { createRouter, createWebHistory } from 'vue-router'

import PanelsView from '@/views/PanelsView.vue'
import AdminView from '@/views/AdminView.vue'
import SettingsView from '@/views/SettingsView.vue'

import LandingView from '@/views/LandingView.vue'
import NotFound from '@/views/NotFound.vue'
import PasswordResetView from '@/views/PasswordResetView.vue'

import { useStore } from '@/stores/store.js'

import VueCookies from 'vue-cookies'
import rollbar from '@/rollbarClient.js'


function requireAccessToken(to, from, next) {
  const access_token = VueCookies.get('9p_access_token')
  if (access_token) {
    next()
  } else {
    next('/')
  }
}

function adminOnly(to, from, next) {
  const store = useStore()
  if (store.user) {
    if (store.user.is_admin) {

      next()
    }
  } else {
    next('/panels')
  }
}

function monitorHome(to, from, next) {
  rollbar.info(`app: home route was visited`)
  next('/')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingView,
    },
    {
      path: '/home',
      name: 'Home',
      beforeEnter: monitorHome
    },


    {
      path: '/password_reset',
      name: 'PasswordReset',
      component: PasswordResetView,
    },
    {
      path: '/panels',
      name: 'Panels',
      component: PanelsView,
      beforeEnter: requireAccessToken
    },

    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView,
      beforeEnter: requireAccessToken
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
      beforeEnter: (to, from, next) => {
        requireAccessToken(to, from, () => {
          adminOnly(to, from, next)
        })
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash, behavior: 'smooth' }
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  store.shareBoxIsOpen = false
  store.checkMobile()
  store.checkPWA()
  store.readTheme()
  const access_token = VueCookies.get("9p_access_token")
  if (to.path === '/') {
    if (access_token) {
      next('/panels')
    } else {
      next() // allow user to just go to '/'
    }
  } else {
    next() // for all other routes, carry on
  }
})


export default router
