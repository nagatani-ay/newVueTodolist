<template>
  <div id="container">
    <div class="sideMenu">
      <side-menu @showContent="showContent = $event"></side-menu>
    </div>

    <div class="mainContent">
      <h1>{{ showContent }}</h1>
      <todo-list
        v-if="showContent == 'TodoList'"
        :todoList="todoList"
        @delete:item="onDelete"
        @update:item="onUpdate"
        @create:item="onCreate"
        @update:status="onCheck"
        @clear:item="onClear"
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
        {
          index: 0,
          text: 'test1',
          status: false,
          time: 'none',
          deadline: 'test',
        },
        {
          index: 1,
          text: 'test2',
          status: false,
          time: 'none',
          deadline: 'test',
        },
        {
          index: 2,
          text: 'test3',
          status: false,
          time: 'none',
          deadline: 'test',
        },
        {
          index: 3,
          text: 'test4',
          status: false,
          time: 'none',
          deadline: 'test',
        },
      ],
      showContent: 'TodoList',
    };
  },
  methods: {
    onCheck(data) {
      this.todoList[data].status = !this.todoList[data].status;
      if (this.todoList[data].status == true) {
        this.todoList[data].time = '完了:' + this.getTime();
      } else {
        this.todoList[data].time = this.getTime();
        console.log('test');
      }
    },
    onClear() {
      let check = confirm('本当に削除してもよろしいですか？');
      if (check) {
        this.todoList = [];
        localStorage.removeItem('todolist');
      }
    },
    onCreate(data) {
      this.todoList.push({
        index: this.todoList.length,
        text: data.text,
        status: false,
        time: this.getTime(),
        deadline: data.deadline,
      });
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
    onSort(data) {
      console.log(data);
      data.forEach((item, i) => {
        item.index = i;
      });
      this.todoList = data;

      console.log(data);
    },
    onUpdate(num, data) {
      this.todoList[num].text = data.text;
      this.todoList[num].deadline = data.deadline;
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
  computed: {},
  mounted() {
    if (localStorage.getItem('todolist') != '') {
      // this.todoList = JSON.parse(localStorage.getItem('todolist'));
    } else {
    }
  },
  // 変更の監視
  watch: {
    // 監視対象
    todoList: {
      handler() {
        localStorage.setItem('todolist', JSON.stringify(this.todoList));
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
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

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  margin: 0 5px;
  appearance: none;
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
