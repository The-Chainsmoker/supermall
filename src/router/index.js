import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('views/home/Home')
const profile = () => import('views/profile/Profile')
const cart = () => import('views/cart/Cart')
const category = () => import('views/category/Category')
const detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: 'Home',
    component: home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: profile
  },
  {
    path: '/cart',
    name: 'Cart',
    component: cart
  },
  {
    path: '/category',
    name: 'Category',
    component: category
  },
  {
    path: '/detail/:iid',
    name: 'Detail',
    component: detail
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
