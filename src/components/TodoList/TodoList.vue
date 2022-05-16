<template>
  <div>title</div>
  <div>
    <ul>
      <todo-item v-for="todo in list" :todo="todo"></todo-item>
    </ul>
  </div>
  <button @click="test">list</button>
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
  methods: {
    test() {
      console.log(this.list);
    },
  },
};
</script>

<style></style>
