<template>
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
        <p>{{ day.year }}</p>
        <p>{{ day.month }}</p>
        <p class="calendar__day,day">{{ day.day }}</p>
        <p>{{ day.dayofweek }}</p>
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
    let selectMonth = ref(6);
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
            year: selectYear.value,
            month: selectMonth.value - 1,
            day: beforeDay - i,
            dayofweek: dayOfWeeks[start - i - 1],
          };
        }
      }

      for (let i = 0; i < lastday; i++) {
        calendarDayList[i + start] = {
          year: selectYear.value,
          month: selectMonth.value,
          day: i + 1,
          dayofweek: dayOfWeeks[(i + start) % 7],
        };
      }
      console.log(calendarDayList[calendarDayList.length - 1]);
      // let nextDays = 0;
      // if (calendarDayList.slice(-1)[0].dayofweek != '土') {
      //   // while (calendarDayList.slice(-1)[0].dayofweek != '土') {
      //   let count = 0;
      //   //   calendarDayList.push({
      //   //     year: selectYear.value + 1,
      //   //     month: selectMonth.value,
      //   //     day: count + 1,
      //   //     dayofweek: dayOfWeeks[(count - nextDays) % 7],
      //   //   });
      //   //   count++;
      //   // }
      //   // console.log('test');

      //   calendarDayList.push({
      //     year: selectYear.value,
      //     month: selectMonth.value + 1,
      //     day: count + 1,
      //     dayofweek: dayOfWeeks[],
      //   });
      // }

      return calendarDayList;
    });

    onMounted(() => {
      const today = new Date();
      selectYear.value = today.getFullYear();

      selectMonth.value = today.getMonth() + 1;
    });

    return {
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
