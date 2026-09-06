import { createRouter, createWebHashHistory } from 'vue-router'

import NavView from '@/components/navCard/index.vue'
import AboutView from '@/pages/about/index.vue'
import HomeView from '@/pages/home/index.vue'
import ProjectsView from '@/pages/projects/index.vue'
import ToolsView from '@/pages/tools/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: HomeView,
      navView: NavView,
    },
  },
  {
    path: '/tools',
    name: 'tools',
    components: {
      default: ToolsView,
      navView: NavView,
    },
  },
  {
    path: '/projects',
    name: 'projects',
    components: {
      default: ProjectsView,
      navView: NavView,
    },
  },
  {
    path: '/about',
    name: 'about',
    components: {
      default: AboutView,
      navView: NavView,
    },
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
