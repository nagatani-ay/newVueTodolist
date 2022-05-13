<template>
  <div>title</div>
  <div>
    <ul>
      <todo-item></todo-item>
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
};
</script>

<style></style>
