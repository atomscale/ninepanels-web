import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '@/stores/mainStore.js'
import Landing from '../views/SignedOut/LandingView.vue'
import SignUpView from '../views/SignedOut/SignUpView.vue'
import SignInView from '../views/SignedOut/SignInView.vue'
import ConsoleView from '../Views/SignedIn/ConsoleView.vue'


import NProgress from 'nprogress'

NProgress.configure({ minimum: 0.3 })
NProgress.configure({ trickleRate: 0.2, trickleSpeed: 400 });


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
      path: '/console',
      name: 'Console',
      component: ConsoleView,
      // beforeEnter: async(to, from) => {
      //   NProgress.start()
      //   const mainStore = useMainStore()
      //   await mainStore.getUser()
      //   NProgress.done()
      // }
    },

    // {
    //   path: '/update',
    //   name: 'UpdateUser',
    //   component: AccountUpdateView
    // },
    // {
    //   path: '/createvehicle',
    //   name: 'CreateVehicle',
    //   component: CreateVehicleView
    // },
    // {
    //   path: '/createfjuleup',
    //   name: 'CreateFjuleUp',
    //   component: CreateFjuleUpView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
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

export default router
