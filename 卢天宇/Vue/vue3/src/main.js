import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';
import store from './store/index.js';

import antd from "ant-design-vue";
import 'ant-design-vue/dist/antd.css';

import { Icon } from "ant-design-vue";
// let { Icon } = antd;
console.log(Icon)
// Vue.component(Icon.name, Icon);

const app = createApp(App);
app.use(router)
    .use(store)
    .use(antd)
    .mount('#app');
