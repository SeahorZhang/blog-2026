import { createRouter, createWebHashHistory } from 'vue-router'

import NavVidw from '@/components/navCard/index.vue'
import HomeView from '@/pages/home/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: HomeView,
      navVidw: NavVidw,
    },
    props: true,
  },
  {
    path: '/tools',
    name: 'tools',
    components: {
      default: () => import('@/pages/tools/index.vue'),
      navVidw: NavVidw,
    },
  },
  {
    path: '/projects',
    name: 'projects',
    components: {
      default: () => import('@/pages/projects/index.vue'),
      navVidw: NavVidw,
    },
  },
  {
    path: '/about',
    name: 'about',
    components: {
      default: () => import('@/pages/about/index.vue'),
      navVidw: NavVidw,
    },
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
