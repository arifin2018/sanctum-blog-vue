import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLogin from "../components/auth/Login.vue";
import AboutView from '../views/AboutView.vue';
import FooterAbout from '../components/Footer/FooterAbout.vue';
import Footer from '../components/Footer/Footer.vue';
import store from '../store'
import cookie from 'vue-cookies'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    components: {
      default: AboutView,
      footer: FooterAbout
    },
  },
  {
    path: '/auth/login',
    name: 'auth.login',
    components: {
      default: AuthLogin,
      footer: Footer
    },
  },
  {
    path: '/auth/logout',
    name: 'auth.logout',
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to,from ,next)=>{
  document.title = to.name + " | Sanctum.blog" ;
  if (to.name == 'auth.login' && (store.getters['auth/check'] || cookie.get('SET_authenticated'))) {
    next({name: 'home'});
  }else{
    if (cookie.get('SET_authenticated') == null) {
      localStorage.clear();
      sessionStorage.clear();
    }
    next();
  }
})

export default router
