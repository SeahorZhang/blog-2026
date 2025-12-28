import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/home/index.vue'
import NavVidw from '@/pages/widgets/navCard/index.vue'

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
  history: createWebHistory(),
  routes,
})
