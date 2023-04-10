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
import Tag from '../components/tag/Tag.vue'
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
    path: '/tag/:tag',
    name: 'tag.show',
    components: {
      default: Tag,
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
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
}
})

router.beforeEach((to, from, next) => {
  document.title = to.name + " | Sanctum.blog";
  if (typeof to.meta.auth != 'undefined') {
    if (to.meta.auth.toString() != cookie.get('SET_authenticated')) {
        if (cookie.get('SET_authenticated') == null && sessionStorage.getItem('SET_token') != null) {
          console.log('login again');
          next({
            name: 'auth.login'
          })
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
        console.log('pnetil login again');
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
      console.log('pnetil login again ayam');
      return next({
        name: 'home'
      });
    } else {
      if (cookie.get('SET_authenticated') == null || sessionStorage.getItem('SET_token') == null || localStorage.getItem('SET_user') == null) {
        console.log('pnetil login again ayam ve');
        localStorage.clear();
        sessionStorage.clear();
        for (const iterator of cookie.keys()) {
          cookie.remove(iterator)
        }
        return next();
      }else{
        console.log('pnetil login again ayam ve es');
        return next();
      }
    }
})

export default router