import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthLogin from "../components/auth/Login.vue";
import AboutView from '../views/AboutView.vue';
import FooterAbout from '../components/Footer/FooterAbout.vue';
import Footer from '../components/Footer/Footer.vue';
import store from '../store'
import cookie from 'vue-cookies'
import Blog from '../components/blog/Blog.vue'
import Post from '../components/post/Post.vue'
import Swal from 'sweetalert2/dist/sweetalert2'

const routes = [{
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
    meta: {
      auth: true
    }
  },
  {
    path: '/blog',
    name: 'blog',
    components: {
      default: Blog,
      footer: Footer
    },
    meta: {
      auth: true
    }
  },
  {
    path: '/post',
    name: 'post.index',
    components: {
      default: Post,
      footer: Footer
    },
    meta: {
      auth: true
    }
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
    meta: {
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name + " | Sanctum.blog";
  if (typeof to.meta.auth != 'undefined') {
    if (to.meta.auth.toString() != cookie.get('SET_authenticated')) {
        if (cookie.get('SET_authenticated') == null && sessionStorage.getItem('SET_token') != null) {
          window.location.reload();
          return Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Sorry you've logout, please login again",
            showConfirmButton: false,
            timer: 3500
          })
        }
        next({
          name: 'auth.login'
        })
        return Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Sorry you are not login, please login the first",
          showConfirmButton: false,
          timer: 3500
        })
      } else{
        next()
      } 
    }
    
    if (to.name == 'auth.login' && (store.getters['auth/check'] || cookie.get('SET_authenticated')) && sessionStorage.getItem('SET_token') && localStorage.getItem('SET_user')) {
      next({
        name: 'home'
      });
    } else {
        if (cookie.get('SET_authenticated') == null || sessionStorage.getItem('SET_token') == null || localStorage.getItem('SET_user') == null) {
          localStorage.clear();
          sessionStorage.clear();
        for (const iterator of cookie.keys()) {
          cookie.remove(iterator)
        }
        next();
      }
      next();
    }
})

export default router