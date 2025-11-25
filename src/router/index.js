import PageHome from '@/pages/PageHome.vue'
import PagePanel from '@/pages/PagePanel.vue'
import PageTemp from '@/pages/PageTemp.vue'
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
    path: '/temp',
    component: PageTemp,
  },
]

export default createRouter({ history: createWebHistory(), routes })
