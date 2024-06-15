import { createRouter, createWebHistory } from 'vue-router'
import UsuarioView from '../views/UsuarioView.vue'

const routes = [
  {
    path: '/',
    name: 'usuario',
    component: UsuarioView
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
