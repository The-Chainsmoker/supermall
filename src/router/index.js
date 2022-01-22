import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('views/home/Home')
const profile = () => import('views/profile/Profile')
const cart = () => import('views/cart/Cart')
const category = () => import('views/category/Category')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/category',
    name: 'category',
    component: category
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
