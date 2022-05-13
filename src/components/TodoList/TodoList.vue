<template>
  <div>title</div>
  <div>
    <ul>
      <todo-item v-for="todo in list" :todo="todo"></todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
  name: 'TodoList-Component',
  components: { TodoItem },
  data() {
    return {};
  },
  props: ['list'],
  emits: [],
};
</script>

<style></style>
