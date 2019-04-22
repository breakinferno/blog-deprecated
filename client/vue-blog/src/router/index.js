import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      },
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import(/* webpackChunkName: "welcome" */ '@/views/Welcome.vue')
      },
      {
        path: 'posts/:id',
        name: 'post',
        component: () => import(/* webpackChunkName: "post" */ '@/views/Post.vue')
      },
      {
        path: 'about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }
    ]
  }, {
    path: '/publish',
    name: 'publish',
    props: { forceFullScreen: true },
    component: () => import(/* webpackChunkName: "publish" */ '@/views/Publish/index.vue')
  }, {
    path: '/login',
    name: 'login',
    props: { forceFullScreen: true },
    component: () => import(/* webpackChunkName: "login"  */ '@/views/Login.vue')
  }, {
    path: '/manage',
    name: 'manage',
    component: () => import(/* webpackChunkName: "manage" */ '@/views/Manage.vue')
  }
  ]
})
