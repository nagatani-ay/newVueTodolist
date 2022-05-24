const { createApp } = require('vue');
import * as VueRouter from 'vue-router/dist/vue-router.esm-bundler';
import App from './App.vue';
import User from './views/User.vue';
import UserTodoList from './views/UserTodoList.vue';
import UserSchedule from './views/UserSchedule.vue';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: User,
      children: [{ path: '', component: UserTodoList }],
    },
    {
      path: '/schedule',
      component: Schedule,
      children: [{ path: '', component: UserSchedule }],
    },
  ],
});

createApp(App).use(router).mount('#app');
