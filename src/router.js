
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
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
      path: '/person/:id',
      name: 'person',
    
      component: () => import('./views/Person.vue')
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
      path: '/movies/:id',
      name: 'movies',
      component: () => import('./views/Movies.vue')
    }
  ]
})