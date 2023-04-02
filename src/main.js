import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(VueAxios,axios).use(store).use(router).mount('#app')
