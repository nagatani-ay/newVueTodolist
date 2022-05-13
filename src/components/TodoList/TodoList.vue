<template>
  <div>title</div>
  <div>
    <ul>
      <todo-item v-for="todo in todolist"></todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
  name: 'todolist',
  components: { TodoItem },
  data() {
    return {};
  },
  props: ['todolist'],
  emits: [],
};
</script>

<style></style>
