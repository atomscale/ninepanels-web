import { createRouter, createWebHistory } from 'vue-router'
import PanelsView from '@/views/SignedIn/PanelsView.vue'
import SettingsView from '@/views/SignedIn/SettingsView.vue'
import LandingView from '@/views/SignedOut/LandingView.vue'
import SignUpView from '@/views/SignedOut/SignUpView.vue'
import SignInView from '@/views/SignedOut/SignInView.vue'
import AboutView from '@/views/SignedOut/AboutView.vue'
import NotFound from '@/views/SignedOut/NotFound.vue'
import PasswordResetView from '@/views/SignedOut/PasswordResetView.vue'
import { useStore } from '@/stores/store.js'

import VueCookies from 'vue-cookies'

function requireAccessToken(to, from, next) {
  const access_token = VueCookies.get('9p_access_token')
  const store = useStore()
  if (access_token) {
    next()
  } else {
    // store.messages.push({ message: "Please sign in", error: true })
    // setTimeout(() => store.messages.shift(), 5000)
    next('/signin')
  }
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
      path: '/signup',
      name: 'SignUp',
      component: SignUpView
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInView,
    },
    {
      path: '/password_reset',
      name: 'PasswordReset',
      component: PasswordResetView,
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
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
  store.visGridIsOpen = false
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
