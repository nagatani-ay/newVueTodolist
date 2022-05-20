<template>
  <div class="Schedule">
    <div class="calender__table" v-for="day in getDays()">{{ day }}</div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
export default {
  props: ['todoList'],
  setup(props) {
    let ToDay = ref('test');
    let days = ref(0);
    function getDays() {
      return days;
    }
    function createCalender(year, month) {
      return new Date(parseInt(year, 10), parseInt(month + 1, 10), 0).getDate();
    }
    onMounted(() => {
      const today = new Date();
      days = createCalender(today.getFullYear(), today.getMonth());
    });
    return {
      ToDay,
      days,
      getDays,
      createCalender,
    };
  },
};
</script>
<style>
.Schedule {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
}
.calender__table {
  display: flex;
  width: 14%;
  height: auto;
}
.calendar__day {
  display: flex;
}
</style>
