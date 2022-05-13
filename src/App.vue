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
      todoList: [],
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
      const filter_list = this.todolist;
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
