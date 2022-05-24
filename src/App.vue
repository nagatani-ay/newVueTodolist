<template>
  <router-view
    :todoList="todoData"
    :windowSize="windowSize"
    @delete:item="onDelete"
    @update:item="onEdit"
    @update:status="onCheck"
    @create:item="onCreate"
    @clear:item="onClear"
  >
  </router-view>
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
    const windowSize = ref(window.innerWidth);
    const todoData = ref([
      // {
      //   code: 0,
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
        code: generateID(),
        text: data.text,
        status: false,
        time: getTime(),
        deadline: data.deadline,
      });
    }

    function generateID() {
      const code = Math.random().toString(32).substring(2);
      todoData.value.forEach((data, i) => {
        if (data.code == code) {
          code = Math.random().toString(32).substring(2);
        }
      });
      return code;
    }

    function onClear() {
      if (confirm('本当に削除してもよろしいですか？')) {
        todoData.value = [];
        localStorage.removeItem('todolist');
      }
    }

    function onCheck(data) {
      const codes = todoData.value.map((x) => x.code);
      const target = codes.indexOf(data);

      todoData.value[target].status = !todoData.value[target].status;
      if (todoData.value[target].status) {
        todoData.value[target].time = '完了:' + getTime();
      } else {
        todoData.value[target].time = getTime();
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
      console.log(data);
      if (confirm('本当に削除してもよろしいですか？')) {
        const codes = todoData.value.map((x) => x.code);
        console.log(codes);
        const target = codes.indexOf(data);
        todoData.value.splice(target, 1);
      }
    }

    function onEdit(data) {
      const codes = todoData.value.map((x) => x.code);
      const target = codes.indexOf(data.code);

      todoData.value[target].text = data.text;
      todoData.value[target].deadline = data.deadline;
    }

    onMounted(() => {
      if (localStorage.getItem('todolist') != '') {
        todoData.value = JSON.parse(localStorage.getItem('todolist'));
      }
    });

    watch(
      () => todoData.value,
      (list, prevList) => {
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
  methods: {},
};
</script>

<style>
ul,
li {
  list-style: none;
}

ul,
li,
p,
h1 {
  padding: 0;
  margin: 0;
}
</style>
