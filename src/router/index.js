import { createRouter, createWebHistory } from 'vue-router'
import PanelsView from '@/views/SignedIn/PanelsView.vue'
import AccountView from '@/views/SignedIn/AccountView.vue'
import Landing from '@/views/SignedOut/LandingView.vue'
import SignUpView from '@/views/SignedOut/SignUpView.vue'
import SignInView from '@/views/SignedOut/SignInView.vue'
import AboutView from '@/views/SignedOut/AboutView.vue'

import NProgress from 'nprogress'

import { useStore } from '@/stores/store.js'

NProgress.configure({ minimum: 0.3 })
NProgress.configure({ trickleRate: 0.2, trickleSpeed: 400 });

import VueCookies from 'vue-cookies'

// this could be requireUserState
function requireUserState(to, from, next) {
  const store = useStore()
  const user = store.user
  console.log("route guard user state: ", user)
  if (user) {
    next()
  } else {
    store.messages.push({ message: "Please sign in", error: true })
    setTimeout(() => store.messages.shift(), 5000)
    next('/signin')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
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
      path: '/about',
      name: 'About',
      component: AboutView,
    },
    {
      path: '/panels',
      name: 'Panels',
      component: PanelsView,
      beforeEnter: requireUserState
    },

    {
      path: '/account',
      name: 'Account',
      component: AccountView,
      beforeEnter: requireUserState
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
  const user = store.user
  const access_token = VueCookies.get("9p_access_token")
  if (to.path === '/') {
    if (access_token && user) {
      next('/panels')
    } else {
      next() // allow user to just go to '/'
    }
  } else {
    next() // for all other routes, carry on
  }
})


export default router
