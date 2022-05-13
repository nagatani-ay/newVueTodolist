<template>
  <div id="container">
    <div class="sidemenu">
      <side-menu @showContent="showContent = $event"></side-menu>
    </div>

    <div>
      <todo-list
        v-if="showContent == 'todolist'"
        :list="filteredlist"
      ></todo-list>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu/SideMenu.vue';
import TodoList from './components/TodoList/TodoList.vue';

export default {
  name: 'App',
  components: {
    SideMenu,
    TodoList,
  },
  data() {
    return {
      contentsList: ['todolist'],
      todoList: [
        { index: 0, text: 'this is test', status: false, time: 'none' },
        { index: 1, text: 'wryyyy', status: false, time: 'none' },
        { index: 3, text: 'gaaaa', status: false, time: 'none' },
        { index: 4, text: 'buuuu', status: false, time: 'none' },
      ],
      showContent: 'todolist',
    };
  },
  methods: {
    test(e) {
      console.log(e);
    },
  },
  computed: {
    filteredlist() {
      const filter_list = this.todoList;
      return filter_list;
    },
  },
};
</script>

<style>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
#container {
  display: flex;
}
.sidemenu {
  display: block;
  width: 15%;
}
</style>
