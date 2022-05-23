<template>
  <button @click="onChange(-1)">←</button>
  <span class="calendar__title">{{ selectYear }}年{{ selectMonth }}月</span>
  <button @click="onChange(1)">→</button>
  <div class="Schedule">
    <div class="header">
      <div class="calendar__weekday" v-for="dayOfWeek in dayOfWeeks">
        <p class="calendar__day,dayOfWeek">{{ dayOfWeek }}</p>
      </div>
    </div>
    <div class="body">
      <div
        class="calender__table"
        v-for="dayitem in dayList"
        :key="dayitem.date"
      >
        <p class="calendar__day,day">{{ dayitem.date.day }}</p>
        <add-menu
          @create:item="$emit('create:item', $event)"
          :source="'schedule'"
          :selectDate="dayitem.date"
        ></add-menu>

        <div v-if="todoDeadlineList[Object.values(dayitem.date).join('-')]">
          <ul>
            <todo-item
              v-for="item in todoDeadlineList[
                Object.values(dayitem.date).join('-')
              ]"
              :key="item.index"
              :todo="item"
              :source="'schedule'"
              @delete:item="$emit('delete:item', item.index)"
              @update:item="$emit('update:item', item.index, $event)"
              @update:status="$emit('update:status', item.index)"
            ></todo-item>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import TodoItem from '../TodoList/TodoItem.vue';
import AddMenu from '../Form/AddMenu.vue';
export default {
  props: ['todoList'],
  components: { AddMenu, TodoItem },
  emits: ['update:item', 'delete:item', 'update:status', 'create:item'],
  setup(props) {
    const selectYear = ref(2022);
    const selectMonth = ref(5);
    const dayOfWeeks = ['日', '月', '火', '水', '木', '金', '土'];

    function onChange(num) {
      selectMonth.value = selectMonth.value + num;

      if (selectMonth.value < 1) {
        selectYear.value--;
        selectMonth.value = 12;
      } else if (selectMonth.value > 12) {
        selectYear.value++;
        selectMonth.value = 1;
      }
    }

    const dayList = computed(() => {
      let calendarDayList = [];
      let start = new Date(selectYear.value, selectMonth.value - 1, 1).getDay();
      let lastday = new Date(selectYear.value, selectMonth.value, 0).getDate();
      let beforeDay = new Date(
        selectYear.value,
        selectMonth.value - 1,
        0
      ).getDate();

      if (0 < start) {
        for (let i = 0; i < start; i++) {
          calendarDayList[start - i - 1] = {
            date: {
              year: selectYear.value,
              month: selectMonth.value - 1,
              day: beforeDay - i,
            },
            dayofweek: dayOfWeeks[start - i - 1],
          };
        }
      }

      for (let i = 0; i < lastday; i++) {
        calendarDayList[i + start] = {
          date: {
            year: selectYear.value,
            month: selectMonth.value,
            day: i + 1,
          },
          dayofweek: dayOfWeeks[(i + start) % 7],
        };
      }

      // let nextDays = 0;
      let count = calendarDayList.length % 7;
      let daycount = 0;
      while (calendarDayList[calendarDayList.length - 1].dayofweek != '土') {
        calendarDayList.push({
          date: {
            year: selectYear.value,
            month: selectMonth.value + 1,
            day: daycount + 1,
          },
          dayofweek: dayOfWeeks[count],
        });
        daycount++;
        count++;

        if (count > 10) {
          break;
        }
      }

      // props.todoList.forEach((todo, i) => {
      //   let index;
      //   let data = todo;
      //   todo.deadline.year = parseInt(todo.deadline.year);
      //   todo.deadline.month = parseInt(todo.deadline.month);
      //   todo.deadline.day = parseInt(todo.deadline.day);

      //   let a = JSON.stringify(Object.values(todo.deadline));
      //   calendarDayList.forEach((list, i) => {
      //     let b = JSON.stringify(Object.values(list.date));
      //     if (a == b) {
      //       index = i;
      //     }
      //   });
      //   calendarDayList[index].data.push(data);
      // });

      return calendarDayList;
    });

    const todoDeadlineList = computed(() => {
      const result = {};

      props.todoList.forEach((todo, i) => {
        const key = Object.values(todo.deadline).join('-');
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push({
          index: todo.index,
          text: todo.text,
          status: todo.status,
          time: todo.time,
          deadline: todo.deadline,
        });
      });
      return result;
    });

    onMounted(() => {
      const today = new Date();
      selectYear.value = today.getFullYear();

      selectMonth.value = today.getMonth() + 1;
    });

    return {
      // fetchTodoList,
      selectMonth,
      selectYear,
      dayOfWeeks,
      dayList,
      onChange,
      todoDeadlineList,
    };
  },
};
</script>
<style>
.header,
.body {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.calender__table,
.calendar__weekday {
  width: 12vw;
  height: 12vw;
  padding: 2px;
}

.calendar__day {
  display: flex;
}
</style>
