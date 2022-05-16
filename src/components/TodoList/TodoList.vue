<template>
  <div>
    <todo-menu
      @create:item="$emit('create:item', $event)"
      @update:filter="$emit('update:filter', $event)"
      @clear:item="$emit('clear:item', $event)"
    ></todo-menu>
  </div>
  <div>
    <ul>
      <todo-item
        v-for="todo in filteredTodoList"
        :todo="todo"
        @delete:item="$emit('delete:item', todo.index)"
        @update:item="$emit('update:item', todo.index, $event)"
        @update:status="$emit('update:status', todo.index)"
      ></todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
import TodoMenu from './TodoMenu.vue';
export default {
  name: 'TodoList-Component',
  components: { TodoItem, TodoMenu },
  data() {
    return {};
  },
  props: ['filteredTodoList'],
  emits: [
    'update:item',
    'delete:item',
    'create:item',
    'update:filter',
    'update:status',
    'clear:item',
  ],
  methods: {},
};
</script>

<style>
ul {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
