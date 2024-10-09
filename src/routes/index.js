import { createRouter, createWebHashHistory } from "vue-router"
import Home from "./Home"
import Movie from "./Movie"
import About from "./About"
import Scss from "./Scss"
import NotFound from "./NotFound"


export default createRouter({
    history: createWebHashHistory(),
    scrollBehavior(){
      return { x: 0, y:0 }
    },

    routes: [
        {
            path: '/',
            component: Home
        },
        {
          path: '/movie/:id',
          component: Movie
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/scss',
            component: Scss
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ]
})