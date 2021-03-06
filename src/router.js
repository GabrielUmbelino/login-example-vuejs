import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from "./store"

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (store.getters.loggedIn) {
          next()
        } else {
          next("/login")
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})