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
import { toRefs, ref, reactive } from 'vue';
export default {
  name: 'App',
  components: {
    SideMenu,
    TodoList,
  },
  setup() {
    const todoList = ref([]);
      const onClear =()=> {
      let check = confirm('本当に削除してもよろしいですか？');
      if (check) {
        todoList.value = [];
        localStorage.removeItem('todolist');
      }
    }
    
    const onCreate = (data) => {
      todoList.value.push({
        index: todoList.value.length,
        text: data.text,
        status: false,
        time: getTime(),
        deadline: data.deadline,
      });
    };

    const onCheck=(data) => {
      todoList.value[data].status = !todoList.value[data].status
      if (todoList.value[data].status == true) {
        todoList.value[data].time = '完了:' + getTime();
      } else {
        todoList.value[data].time = getTime();
      }
    },

const getTime =()=> {
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








    return {
      todoList,
      onCreate,
      onCheck,
      getTime,
      onClear,
    };
  },
  data() {
    return {
      showContent: 'TodoList',
    };
  },
  methods: {



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
      data.forEach((item, i) => {
        item.index = i;
      });
      this.todoList = data;
    },
    onUpdate(num, data) {
      this.todoList[num].text = data.text;
      this.todoList[num].deadline = data.deadline;
    },


  },
  computed: {},
  mounted() {
    if (localStorage.getItem('todolist') != '') {
      this.todoList = JSON.parse(localStorage.getItem('todolist'));
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

/* button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  margin: 0 5px;
  appearance: none;
} */

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
