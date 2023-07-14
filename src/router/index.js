import { createRouter, createWebHistory } from 'vue-router'
import DailyView from '@/views/SignedIn/DailyView.vue'
import Landing from '@/views/SignedOut/LandingView.vue'
import SignUpView from '@/views/SignedOut/SignUpView.vue'
import SignInView from '@/views/SignedOut/SignInView.vue'
import WhyView from '@/views/SignedOut/WhyView.vue'

import NProgress from 'nprogress'

import {useMainStore} from '@/stores/mainStore.js'

NProgress.configure({ minimum: 0.3 })
NProgress.configure({ trickleRate: 0.2, trickleSpeed: 400 });

import VueCookies from 'vue-cookies'

function requireAccessToken(to, from, next) {
  const store = useMainStore()
  // const access_token = VueCookies.get("9p_access_token")
  const user = store.user
  if (user) {
    next()
  } else {
    store.messages.push({ message: "Please sign in.", error: true })
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
      path: '/why',
      name: 'Why',
      component: WhyView,
    },
    {
      path: '/daily',
      name: 'Daily',
      component: DailyView,
      beforeEnter: requireAccessToken
      },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/AboutView.vue')
    // }
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
  if (to.path === '/') {
    const access_token = VueCookies.get("9p_access_token")
    if (access_token) {
      next('/daily')
    } else {
      next()
    }
  } else {
    next() // for all other routes, carry on
  }
})

export default router
