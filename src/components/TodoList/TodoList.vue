<template>
  <div>
    <todo-menu
      @create:item="$emit('create:item', $event)"
      @clear:item="$emit('clear:item', $event)"
      @update:filter="filterType = $event"
      @sort:item="sortType = $event"
    ></todo-menu>
  </div>
  <div>
    <ul>
      <todo-item
        v-for="todo in sortedList"
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
    return { sortType: 'Text', filterType: '全' };
  },
  props: ['todoList'],
  emits: [
    'update:item',
    'delete:item',
    'create:item',
    'update:status',
    'clear:item',
  ],
  methods: {},
  computed: {
    // フィルター
    filteredList: {
      get() {
        let filtered_list = [];
        if (this.filterType == '全') {
          filtered_list = this.todoList.map((x) => x);
        } else if (this.filterType == '済') {
          this.todoList.forEach((todo, i) => {
            if (todo.status == true) {
              filtered_list.push({
                index: i,
                text: todo.text,
                status: todo.status,
                time: todo.time,
                deadline: todo.deadline,
              });
            }
          });
        } else if (this.filterType == '未') {
          this.todoList.forEach((todo, i) => {
            if (todo.status == false) {
              filtered_list.push({
                index: i,
                text: todo.text,
                status: todo.status,
                time: todo.time,
                deadline: todo.deadline,
              });
            }
          });
        }
        return filtered_list;
      },
      set(list) {
        const filtered_list = todoList.map((x) => x);
      },
    },
    // ソート
    sortedList: {
      get() {
        let sorted_list = [];
        // テキスト順
        if (this.sortType == 'Text') {
          sorted_list = this.filteredList
            .map((x) => x)
            .sort((a, b) => {
              if (a.text === b.text) {
                return a.deadline < b.deadline ? -1 : 1;
              }
              return a.text < b.text ? -1 : 1;
            });
          // 完了順
        } else if (this.sortType == 'Status') {
          const truelist = this.filteredList
            .map((x) => x)
            .filter((x) => (x.status = 'true'));

          console.log(truelist);
          // 最終更新時間
        } else if (this.sortType == 'Time') {
          sorted_list = this.filteredList
            .map((x) => x)
            .sort((a, b) => {
              if (a.time === b.time) {
                return a.text < b.text ? -1 : 1;
              }
              return a.time < b.time ? -1 : 1;
            });
          // 締切順
        } else if (this.sortType == 'Deadline') {
          sorted_list = this.filteredList
            .map((x) => x)
            .sort((a, b) => {
              if (a.deadline === b.deadline) {
                return a.text < b.text ? -1 : 1;
              }
              return a.deadline < b.deadline ? -1 : 1;
            });
        }
        return sorted_list;
      },
    },
  },
};
</script>

<style>
ul {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
