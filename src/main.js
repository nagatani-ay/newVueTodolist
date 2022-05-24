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
      children: [
        { path: 'todolist', component: UserTodoList, props: true },

        { path: 'schedule', component: UserSchedule, props: true },
      ],
    },
  ],
});

createApp(App).use(router).mount('#app');
