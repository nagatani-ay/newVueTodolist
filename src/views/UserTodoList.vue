<template>
  <todo-list
    :todoList="todoList"
    :windowSize="windowSize"
    @delete:item="$emit('delete:item'), $event"
    @update:item="$emit('update:item'), $event"
    @update:status="$emit('update:status'), $event"
    @create:item="$emit('create:item'), $event"
    @clear:item="$emit('clear:item'), $event"
  ></todo-list>
</template>

<script>
import TodoList from '../components/TodoList/TodoList.vue';
export default {
  components: { TodoList },
  props: ['todoList', 'windowSize'],
  emits: [
    'delete:item',
    'update:item',
    'update:status',
    'create:item',
    'clear:item',
  ],
  setup() {},
};
</script>

<style></style>
