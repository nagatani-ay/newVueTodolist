<template

  <div id="container">
    <div class="sideMenu">
      <side-menu @showContent="showContent = $event"></side-menu>
    </div>

    <div class="mainContent">
      <h1>{{ showContent }}</h1>
      <todo-list
        v-if="showContent == 'TodoList'"
        :todoList="todoData"
        @delete:item="onDelete"
        @update:item="onEdit"
        @create:item="onCreate"
        @update:status="onCheck"
        @clear:item="onClear"
      ></todo-list>

      <schedule v-if="showContent == 'Schedule'" :todoList="todoData"></schedule>
      
    </div>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu/SideMenu.vue';
import TodoList from './components/TodoList/TodoList.vue';
import Schedule from './components/Schedule/Schedule.vue';
import { toRefs, ref, reactive, onMounted, watch } from 'vue';

export default {
  name: 'App',
  components: {
    SideMenu,
    TodoList,
    Schedule,
  },
  setup() {
    let todoData = ref([]);
    const showContent = ref('Schedule');
    function onCreate(data) {
      
      let array= data.deadline;
      console.log(array)
      todoData.value.push({
        index: todoData.value.length,
        text: data.text,
        status: false,
        time: getTime(),
        deadline: {year:data.deadline.shift(),month:data.deadline.shift(),day:data.deadline.shift()},
      });
    }
    function onClear() {
      if (confirm('本当に削除してもよろしいですか？')) {
        todoData.value = [];
        localStorage.removeItem('todolist');
      }
    }

    function onCheck(data) {
      todoData.value[data].status = !todoData.value[data].status;
      if (todoData.value[data].status) {
        todoData.value[data].time = '完了:' + getTime();
      } else {
        todoData.value[data].time = getTime();
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
        todoData.value.splice(data, 1);
        todoData.value.forEach((todo, i) => {
          todo.index = i;
        });
      }
    }

    function onEdit(num, data) {
 
      todoData.value[num].text = data.text;
      todoData.value[num].deadline = {year:data.deadline.shift(),month:data.deadline.shift(),day:data.deadline.shift()};
    }

    onMounted(() => {
      if (localStorage.getItem('todolist') != '') {
        todoData.value = JSON.parse(localStorage.getItem('todolist'));
       
      }
    });

    watch(
      () => todoData.value,
      (list,prevList)=> {
    
          localStorage.setItem('todolist', JSON.stringify(list));
      },
      { deep: true }
    );
    return {
      todoData,
      showContent,
      onCheck,
      getTime,
      onClear,
      onDelete,
      onEdit,
      onCreate,
    };
  },
  methods: {
    
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
}
.mainContent {
}
</style>
