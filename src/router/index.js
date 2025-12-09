import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/pages/PageHome.vue'
import PagePanel from '@/pages/PagePanel.vue'
import PageSignUp from '@/pages/PageSignUp.vue'
import PageSignIn from '@/pages/PageSignIn.vue'

const routes = [
  {
    path: '/',
    component: PageHome,
  },
  {
    path: '/panel',
    component: PagePanel,
  },
  {
    path: '/signUp',
    component: PageSignUp,
  },
  {
    path: '/signIn',
    component: PageSignIn,
  },
]

export default createRouter({ history: createWebHistory(), routes })
