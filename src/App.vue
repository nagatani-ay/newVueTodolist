<template

  <div id="container">
    <div class="sideMenu">
      <side-menu @showContent="showContent = $event"
      :source="'todomenu'"></side-menu>
    </div>

    <div class="mainContent">
      <h1>{{ showContent }}</h1>
      <todo-list
        v-if="showContent == 'TodoList'"
        :todoList="todoData"
        @delete:item="onDelete"
        @update:item="onEdit"
        @update:status="onCheck"
        @create:item="onCreate"
        @clear:item="onClear"
        :windowSize="windowSize"
      ></todo-list>

      <schedule v-if="showContent == 'Schedule'" 
        :todoList="todoData"
        @delete:item="onDelete"
        @update:item="onEdit"
        @update:status="onCheck"
        @create:item="onCreate"
        :windowSize="windowSize"
      ></schedule>
      
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
    const windowSize =ref(window.innerWidth);
    const todoData = ref([
      // {
      //   index: 0,
      //   text: "test1",
      //   status: false,
      //   time: getTime(),
      //   deadline:{
      //     year:2022,
      //     month:5,
      //     day:5,
      //   },
      // }
      ]);
    const showContent = ref('TodoList');
    function onCreate(data) {
  
      todoData.value.push({
        code: rand,
        text: data.text,
        status: false,
        time: getTime(),
        deadline:data.deadline,
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
      console.log(data)
      if (confirm('本当に削除してもよろしいですか？')) {
        todoData.value.splice(data, 1);
 
      }
    }

    function onEdit(num, data) {
      console.log("test")
 
      todoData.value[num].text = data.text;
      todoData.value[num].deadline = data.deadline;
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
      windowSize,
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
p ,
h1{
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
