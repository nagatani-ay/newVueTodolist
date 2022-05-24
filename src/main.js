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
      path: '/user',
      component: User,
      children: [
        { path: 'todolist', component: UserTodoList },

        { path: 'schedule', component: UserSchedule },
      ],
    },
  ],
});

createApp(App).use(router).mount('#app');
