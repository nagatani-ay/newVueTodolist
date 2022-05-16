<template>
  <div>title</div>
  <div>
    <ul>
      <todo-item
        v-for="todo in list"
        :todo="todo"
        @delete:item="onDelete"
      ></todo-item>
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
    onDelete(index) {
      let check = confirm('本当に削除してもよろしいですか？');
      if (check) {
        this.list.splice(index, 1);
        this.list.forEach((todo, i) => {
          todo.id = i;
        });
      }
    },
    onUpdate(index, item) {
      this.todolist[index].text = item;
    },
  },
};
</script>

<style></style>
