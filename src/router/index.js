import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArifinItem from "../components/ArifinItem.vue";
import AboutView from '../views/AboutView.vue';
import FooterAbout from '../components/Footer/FooterAbout.vue';

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
    path: '/arifin',
    name: 'arifin',
    component: ArifinItem
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
