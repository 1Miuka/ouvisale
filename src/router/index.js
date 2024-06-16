import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: () => import('../views/UsuarioView.vue')
  },
  {
    path: '/gestao',
    name: 'gestao',
    component: () => import('../views/GestaoView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/RegistroView.vue')
  },
  {
    path: '/mongo',
    name: 'mongo',
    component: () => import('../views/TesteMongo.vue')
  },
  {
    path: '/manifestacao',
    name: 'manifestacao',
    component: () => import('../views/ManifestacaoView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
