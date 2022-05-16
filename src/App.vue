<template>
  <div id="container">
    <div class="sideMenu">
      <side-menu @showContent="showContent = $event"></side-menu>
    </div>

    <div class="mainContent">
      <h1>{{ showContent }}</h1>
      <todo-list
        v-if="showContent == 'TodoList'"
        :filteredTodoList="filteredTodoList"
        @delete:item="onDelete"
        @update:item="onUpdate"
        @create:item="onCreate"
        @update:filter="filter_select = $event"
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
      todoList: [
        { index: 0, text: 'test1', status: false, time: 'none' },
        { index: 1, text: 'test2', status: false, time: 'none' },
        { index: 2, text: 'test3', status: true, time: 'none' },
        { index: 3, text: 'test4', status: false, time: 'none' },
      ],
      showContent: 'TodoList',

      filter_select: '全',
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
        time: this.getTime(),
      });
    },

    getTime() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const hour = today.getHours();
      const minute = today.getMinutes();
      const second = today.getSeconds();
      return (
        year +
        '/' +
        month +
        '/' +
        day +
        '/' +
        hour +
        ':' +
        minute +
        ':' +
        second
      );
    },
  },
  computed: {
    filteredTodoList: {
      get() {
        const filtered_list = [];
        if (this.filter_select == '全') {
          this.todoList.forEach((todo, i) => {
            filtered_list.push({
              index: i,
              text: todo.text,
              status: todo.stat,
              time: todo.time,
            });
          });
        } else if (this.filter_select == '済') {
          this.todoList.forEach((todo, i) => {
            if (todo.status == true) {
              filtered_list.push({
                index: i,
                text: todo.text,
                status: todo.stat,
                time: todo.time,
              });
            }
          });
        } else if (this.filter_select == '未') {
          this.todoList.forEach((todo, i) => {
            if (todo.status == false) {
              filtered_list.push({
                index: i,
                text: todo.text,
                status: todo.stat,
                time: todo.time,
              });
            }
          });
        }
        return filtered_list;
      },
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
