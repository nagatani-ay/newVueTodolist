<template>
  <div id="container">
    <div class="sidemenu">
      <side-menu @select:content="showContent = $event"></side-menu>
    </div>

    <div>
      <todo-list v-if="showContent == 'todolist'"></todo-list>
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
      showContent: 'todolist',
    };
  },
  methods: {},
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
