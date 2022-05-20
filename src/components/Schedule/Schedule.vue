<template>
  {{ fetchTodoList }}
  <button @click="onChange(-1)"><</button>
  <div class="calendar__title">{{ selectYear }}年{{ selectMonth }}月</div>
  <button @click="onChange(1)">></button>
  <div class="Schedule">
    <div class="header">
      <div class="calendar__weekday" v-for="dayOfWeek in dayOfWeeks">
        <p class="calendar__day,dayOfWeek">{{ dayOfWeek }}</p>
      </div>
    </div>
    <div class="body">
      <div class="calender__table" v-for="day in dayList">
        <p class="calendar__day,day">{{ day.date.day }}</p>
        <div class="calendar__todolist">
          <p v-for="tododata in day.data">{{ tododata }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
export default {
  props: ['todoList'],
  setup(props) {
    let selectYear = ref(2022);
    let selectMonth = ref(5);
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
            data: [],
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
          data: [],
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
          data: [],
        });
        daycount++;
        count++;

        if (count > 10) {
          break;
        }
      }

      return calendarDayList;
    });

    const fetchTodoList = computed(() => {
      dayList.value.forEach((list, i) => {
        list.data = [];
      });
      props.todoList.forEach((todo, i) => {
        let index;
        let text = todo.text;
        todo.deadline.year = parseInt(todo.deadline.year);
        todo.deadline.month = parseInt(todo.deadline.month);
        todo.deadline.day = parseInt(todo.deadline.day);

        let a = JSON.stringify(Object.values(todo.deadline));
        dayList.value.forEach((list, i) => {
          let b = JSON.stringify(Object.values(list.date));
          if (a == b) {
            index = i;
          }
        });
        dayList.value[index].data.push(text);

        // JSON.stringify(Object.entries(calendarDayList.value[i].date))
      });

      return 'test';
    });

    onMounted(() => {
      const today = new Date();
      selectYear.value = today.getFullYear();

      selectMonth.value = today.getMonth() + 1;
    });

    return {
      fetchTodoList,
      selectMonth,
      selectYear,
      dayOfWeeks,
      dayList,
      onChange,
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
