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
        @update:item="onEdit"
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
import { toRefs, ref, reactive, onMounted, watch } from 'vue';
export default {
  name: 'App',
  components: {
    SideMenu,
    TodoList,
  },
  setup() {
    const todoList = ref([
      {
        index: 0,
        text: 'test',
        status: false,
        time: getTime(),
        deadline: '2022/10/20',
      },
      {
        index: 1,
        text: 'test2',
        status: false,
        time: getTime(),
        deadline: '2022/10/20',
      },
    ]);

    const showContent = ref('TodoList');

    function onClear() {
      if (confirm('本当に削除してもよろしいですか？')) {
        todoList.value = [];
        localStorage.removeItem('todolist');
      }
    }

    function onCreate(data) {
      console.log(todoList.value);

      todoList.value.push({
        index: todoList.value.length,
        text: data.text,
        status: false,
        time: getTime(),
        deadline: data.deadline,
      });
    }

    function onCheck(data) {
      todoList.value[data].status = !todoList.value[data].status;
      if (todoList.value[data].status) {
        todoList.value[data].time = '完了:' + getTime();
      } else {
        todoList.value[data].time = getTime();
      }
    }

    function getTime() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const hour = today.getHours();
      const minute = today.getMinutes();
      const second = today.getSeconds();
      return `${year}/${month}/${day}/${hour}:${minute}:${second}`;
    }

    function onDelete(data) {
      if (confirm('本当に削除してもよろしいですか？')) {
        todoList.value.splice(data, 1);
        todoList.value.forEach((todo, i) => {
          todo.index = i;
        });
      }
    }

    function onEdit(num, data) {
      console.log('edit');
      todoList.value[num].text = data.text;
      todoList.value[num].deadline = data.deadline;
    }

    onMounted(() => {
      if (localStorage.getItem('todolist') != '') {
        todoList.value = JSON.parse(localStorage.getItem('todolist'));
      }
    });

    watch(
      () => todoList.value,
      (list) => {
        if (todoList != null) {
          localStorage.setItem('todolist', JSON.stringify(list));
        }
      },
      { deep: true }
    );
    return {
      todoList,
      showContent,
      onCreate,
      onCheck,
      getTime,
      onClear,
      onDelete,
      onEdit,
    };
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
