<template>
  <div id="container">
    <div class="sideMenu">
      <side-menu @showContent="showContent = $event"></side-menu>
    </div>

    <div class="mainContent">
      <todo-list
        v-if="showContent == 'todolist'"
        :filteredTodoList="filteredTodoList"
        :sortList="sorts"
        :filteList="filters"
        @delete:item="onDelete"
        @update:item="onUpdate"
        @create:item="onCreate"
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
      todoList: [
        { index: 0, text: 'test1', status: false, time: 'none' },
        { index: 1, text: 'test2', status: false, time: 'none' },
        { index: 2, text: 'test3', status: true, time: 'none' },
        { index: 3, text: 'test4', status: false, time: 'none' },
      ],
      sorts: ['Text', 'Status'],
      filters: ['All', 'Completed', 'inCompleted'],
      showContent: 'todolist',
    };
  },
  methods: {
    test(e) {
      console.log(e);
    },
    onDelete(num) {
      let check = confirm('本当に削除してもよろしいですか？');
      if (check) {
        this.todoList.splice(num, 1);
        this.todoList.forEach((todo, i) => {
          todo.index = i;
        });
      }
    },
    onUpdate(num, data) {
      console.log(num);
      console.log(data);
      this.todoList[num].text = data;
    },

    onCreate(data) {
      console.log(data);
      this.todoList.push({
        index: this.todoList.length,
        text: data,
        status: false,
        time: 'ima',
      });
    },
  },
  computed: {
    filteredTodoList() {
      const filtered_todolist = this.todoList;
      return filtered_todolist;
    },
  },
};
</script>

<style>
ul,
li {
  list-style: none;
}

ul,
li,
p {
  padding: 0;
  margin: 0;
}

#container {
  display: flex;
}
.sideMenu {
  display: block;
  width: 15%;
}
.mainContent {
  width: 85%;
}
</style>
