<template>
  <div>
    <todo-menu
      @create:item="$emit('create:item', $event)"
      @clear:item="$emit('clear:item', $event)"
      @update:filter="filterType = $event"
      @sort:item="
        sortType = $event.type;
        sortOrder = $event.order;
      "
    ></todo-menu>
  </div>
  <div>
    <ul>
      <todo-item
        v-for="todo in listSort"
        :key="todo.index"
        :todo="todo"
        :source="'todolist'"
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
import { ref, computed, toRefs, isReactive, isRef } from 'vue';
export default {
  name: 'TodoList-Component',
  components: { TodoItem, TodoMenu },

  props: ['todoList'],
  emits: [
    'update:item',
    'delete:item',
    'create:item',
    'update:status',
    'clear:item',
  ],
  setup(props) {
    const sortType = ref('Text');
    const sortOrder = ref('');
    const filterType = ref('全');

    const listFilter = computed(() => {
      //listFilter=>Ref
      let filtered_list = [];

      filtered_list = props.todoList.map((x) => x);
      if (filterType.value == '全') {
      } else if (filterType.value == '済') {
        filtered_list = filtered_list.filter((x) => x.status == true);
      } else if (filterType.value == '未') {
        filtered_list = filtered_list.filter((x) => x.status == false);
      }
      return filtered_list;
    });

    const listSort = computed(() => {
      let sorted_list = [];
      let order = 1;
      if (sortOrder.value == 'ascend') {
        order = -1;
      } else {
        order = 1;
      }
      if (sortType.value == '') {
      } else {
      }
      // テキスト順
      if (sortType.value == 'Text') {
        sorted_list = listFilter.value
          .map((x) => x)
          .sort((a, b) => {
            if (a.text === b.text) {
              return a.deadline < b.deadline ? -order : order;
            }
            return a.text < b.text ? -order : order;
          });
        // 完了順
      } else if (sortType.value == 'Status') {
        let truelist = listFilter.value
          .filter((x) => x.status == true)
          .sort((a, b) => {
            if (a.text === b.text) {
              return a.deadline < b.deadline ? -order : order;
            }
            return a.text < b.text ? -order : order;
          });
        let falselist = listFilter.value
          .filter((x) => x.status == false)
          .sort((a, b) => {
            if (a.text === b.text) {
              return a.deadline < b.deadline ? -order : order;
            }
            return a.text < b.text ? -order : order;
          });

        if (order == 1) {
          sorted_list = truelist.concat(falselist);
        } else {
          sorted_list = falselist.concat(truelist);
        }

        // 最終更新時間
      } else if (sortType.value == 'Time') {
        sorted_list = listFilter.value
          .map((x) => x)
          .sort((a, b) => {
            if (a.time === b.time) {
              return a.text < b.text ? -order : order;
            }
            return a.time < b.time ? -order : order;
          });
        // 締切順
      } else if (sortType.value == 'Deadline') {
        sorted_list = listFilter.value
          .map((x) => x)
          .sort((a, b) => {
            if (a.deadline === b.deadline) {
              return a.text < b.text ? -order : order;
            }
            return a.deadline < b.deadline ? -order : order;
          });
      }
      return sorted_list;
    });
    return { sortType, sortOrder, filterType, listFilter, listSort };
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
