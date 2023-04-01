import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLogin from "../components/auth/Login.vue";
import AboutView from '../views/AboutView.vue';
import FooterAbout from '../components/Footer/FooterAbout.vue';
import Footer from '../components/Footer/Footer.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    components: {
      default: AboutView,
      footer: FooterAbout
    }
  },
  {
    path: '/auth/login',
    name: 'auth.login',
    components: {
      default: AuthLogin,
      footer: Footer
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
