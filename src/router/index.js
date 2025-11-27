import PageHome from '@/pages/PageHome.vue'
import PagePanel from '@/pages/PagePanel.vue'
import PageAdmin from '@/pages/PageAdmin.vue'
import { createRouter, createWebHistory } from 'vue-router'

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
    path: '/admin',
    component: PageAdmin,
  },
]

export default createRouter({ history: createWebHistory(), routes })
