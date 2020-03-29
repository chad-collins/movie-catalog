
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    
    {
      path: '/movie/:id',
      name: 'movie',
      
      component: () => import('./views/Movie.vue')
    },
    {
      path: '/actor/:id',
      name: 'actor',
    
      component: () => import('./views/Actor.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('./views/Movies.vue')
    }
  ]
})