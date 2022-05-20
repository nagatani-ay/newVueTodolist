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
        <p class="calendar__day,day">{{ day }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from 'vue';
export default {
  props: ['todoList'],
  setup(props) {
    let selectYear = ref('2022');
    let selectMonth = ref('5');
    const dayOfWeeks = ['日', '月', '火', '水', '木', '金', '土'];

    function onChange(num) {
      selectMonth = selectMonth + num;

      if (selectMonth < 1) {
        selectYear--;
        selectMonth = 12;
      } else if (selectMonth > 12) {
        selectYear++;
        selectMonth = 1;
      }
      console.log(selectYear);
      console.log(selectMonth);
    }

    const dayList = computed(() => {
      let calendarDayList = [];
      let date = new Date(selectYear.value, selectMonth.value - 1, 1);
      let start = date.getDay();
      let lastday = new Date(selectYear.value, selectMonth.value, 0).getDate();
      let beforeDay = new Date(
        selectYear.value,
        selectMonth.value - 1,
        0
      ).getDate();

      if (0 < start) {
        for (let i = 0; i < start; i++) {
          calendarDayList[start - i - 1] = beforeDay - i;
        }
      }

      for (let i = 0; i < lastday; i++) {
        calendarDayList[i + start] = i + 1;
      }
      console.log(lastday);
      let nextDays = 35 - lastday;
      console.log(nextDays);

      for (let l = 0; l < nextDays; l++) {
        calendarDayList.push(l + 1);
      }

      return calendarDayList;
    });

    function getDays(year, month) {
      return new Date(parseInt(year, 10), parseInt(month + 1, 10), 0).getDate();
    }

    onMounted(() => {
      const today = new Date();
      selectYear = today.getFullYear();

      selectMonth = today.getMonth() + 1;
    });

    return {
      selectMonth,
      selectYear,
      dayOfWeeks,
      getDays,
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
  display: flex;
  width: 12vw;
  height: 12vw;
  padding: 2px;
}

.calendar__day {
  display: flex;
}
</style>
