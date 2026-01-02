import { createRouter, createWebHashHistory } from 'vue-router'

import NavVidw from '@/components/navCard/index.vue'
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
      navVidw: NavVidw,
    },
  },
  {
    path: '/tools',
    name: 'tools',
    components: {
      default: ToolsView,
      navVidw: NavVidw,
    },
  },
  {
    path: '/projects',
    name: 'projects',
    components: {
      default: ProjectsView,
      navVidw: NavVidw,
    },
  },
  {
    path: '/about',
    name: 'about',
    components: {
      default: AboutView,
      navVidw: NavVidw,
    },
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
