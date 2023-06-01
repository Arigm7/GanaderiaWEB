import Vue from 'vue'
import VueRouter from 'vue-router'
import InicioSesion from '../views/InicioSesion'
import principal from '../views/Principal'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicioSesion',
    component: InicioSesion
  },
  {
    path: '/principal',
    name: 'principal',
    component: principal,
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
