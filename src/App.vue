<template>
  <div id="container">
    <div class="sidemenu">
      <side-menu></side-menu>
    </div>

    <div>
      <todo-list v-if="showContent == 'todolist'"></todo-list>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import TodoList from './components/ToDoList.vue';

export default {
  name: 'App',
  components: {
    SideMenu,
    TodoList,
  },
  data() {
    return {
      contentsList: ['todolist'],
      showContent: 'todolist',
    };
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
