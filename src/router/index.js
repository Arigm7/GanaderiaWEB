import Vue from 'vue'
import VueRouter from 'vue-router'
import InicioSesion from '../views/client/InicioSesion'
import AdminGanado from '../views/admin/adminGanado'
import AdminCria from '../views/admin/adminCria'
import AdminLote from '../views/admin/adminLote'
import AdminVeterinario from '../views/admin/adminVeterinario'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicioSesion',
    component: InicioSesion
  },
  {
    path: '/adminGanado',
    name: 'Administracion de Ganado',
    component: AdminGanado
  },
  {
    path: '/adminCria',
    name: 'Administracion de Cria',
    component: AdminCria
  },
  {
    path: '/adminLote',
    name: 'Administracion de Lote',
    component: AdminLote
  },
  {
    path: '/adminVeterinario',
    name: 'Administracion de Visitas de Veterinario',
    component: AdminVeterinario
  },

  /*{
    path: '/principal',
    name: 'principal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import( webpackChunkName: "about"  '../views/AboutView.vue')
    }
  }*/
]

const router = new VueRouter({
  routes
})

export default router
