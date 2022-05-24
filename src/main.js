const { createApp } = require('vue');
import * as VueRouter from 'vue-router/dist/vue-router.esm-bundler';
import App from './App.vue';

const Home = { template: '<p>test1</p>' };
const Schedule = { template: '<p>test2</p>' };

const routes = [
  { path: '/', component: Home },
  { path: '/schedule', component: Schedule },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
