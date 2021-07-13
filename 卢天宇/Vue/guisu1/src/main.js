import Vue from 'vue'
import App from './App.vue'

import router from './router';
import store from './store';

import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(antd);

import axios from 'axios';
Vue.prototype.$axios = axios.create();

Vue.config.productionTip = true;

// Vue.BASE_URL = './'
console.log(process.env.VUE_APP_NAME)
console.log(process.env.NODE_ENV);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
