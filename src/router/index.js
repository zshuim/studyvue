import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home1',
    component: HomeView,
    redirect:'/home'
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/password',
    name: 'password',
    component:()=> import(/* webpackChunkName: "password" */ '../views/password.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "password" */ '../views/Login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "password" */ '../views/home/home.vue')
  },

  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "password" */ '../views/error/404.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "password" */ '../views/error/401.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
