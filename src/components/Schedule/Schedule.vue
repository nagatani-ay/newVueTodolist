<template>
  <div class="calendar__menu">
    <custom-button class="calendar__menu__button" @click="onChange(-1)"
      ><span class="menu__button__text">←</span></custom-button
    >
    <span class="calendar__title">{{ selectYear }}年{{ selectMonth }}月</span>
    <custom-button class="calendar__menu__button" @click="onChange(1)"
      ><span class="menu__button__text">→</span></custom-button
    >
  </div>
  <div class="Schedule">
    <div class="calendar__header">
      <div
        v-if="viewStyle == 'full'"
        class="calendar__dayOfWeek"
        :class="dayOfWeek"
        v-for="dayOfWeek in dayOfWeeks"
      >
        <p>{{ dayOfWeek }}</p>
      </div>
    </div>
    <div class="calendar__body">
      <div
        class="calendar__table"
        :class="dayitem.dayofweek"
        v-for="dayitem in dayList"
        :key="dayitem.date"
      >
        <div class="calendar__item__header" :class="dayitem.dayofweek">
          <p v-if="viewStyle == 'eco'">{{ dayitem.dayofweek.slice(0, 3) }}</p>
          <p
            class="calendar__day"
            :class="dayitem.dayofweek"
            :class="dayitem.date.month == selectMonth ? '' : 'outer__month'"
          >
            {{ dayitem.date.day }}
          </p>
          <add-menu
            @create:item="$emit('create:item', $event)"
            :source="'schedule'"
            :selectDate="dayitem.date"
          ></add-menu>
        </div>
        <div
          class="calendar__item__body"
          :class="dayitem.dayofweek"
          v-if="todoDeadlineList[Object.values(dayitem.date).join('-')]"
        >
          <ul class="calendar__droparea">
            <transition-group appear name="list">
              <todo-item
                class="calendar__todo"
                v-for="item in todoDeadlineList[
                  Object.values(dayitem.date).join('-')
                ]"
                :key="item.code"
                :todo="item"
                :source="'schedule'"
                @delete:item="$emit('delete:item', item.code)"
                @update:item="$emit('update:item', $event)"
                @update:status="$emit('update:status', item.code)"
              ></todo-item>
            </transition-group>
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
import CustomButton from '../Form/Button.vue';
export default {
  props: ['todoList', 'viewStyle'],
  components: { AddMenu, TodoItem, CustomButton },
  emits: [
    'update:item',
    'delete:item',
    'update:status',
    'create:item',
    'clear:item',
  ],
  setup(props) {
    const selectYear = ref(2022);
    const selectMonth = ref(5);
    const dayOfWeeks = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const viewStyle = ref('');

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

    function onDrop(event) {
      console.log(event);
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
      while (
        calendarDayList[calendarDayList.length - 1].dayofweek != 'Saturday'
      ) {
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
          code: todo.code,
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
<style scoped>
.calendar__menu {
  display: flex;
  margin: 0, auto;
  justify-content: center;
  align-items: center;
}
.calendar__menu__button {
  width: 20px;
  height: 20px;
}
.menu__button__text {
  width: 100%;
  height: 100%;
  padding: 2px 0px;
}
.calendar__title {
  font-size: 1.8em;
}

.calendar__header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
}
.calendar__dayOfWeek {
  width: 100%;
  text-align: center;
  border: solid 1px black;
}
.calendar__droparea {
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 800px) {
  .calendar__body {
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: minmax(150px, auto);
  }
  .calendar__table {
    width: 100%;
    height: 100%;
    display: block;
    border: solid 1px black;
  }
  .calendar__day {
    font-size: 1.5em;
  }
  .calendar__item__header {
    display: flex;
    justify-content: space-between;
  }
  .calendar__todo {
    color: black;
    background-color: white;
    margin: 0 5px;
  }
}

.calendar__item__body {
}

.Sunday {
  color: red;
  background-color: #ffe6ea;
}
.Saturday {
  color: blue;
  background-color: #e6f2ff;
}
.outer__month {
  opacity: 0.2;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media screen and (max-width: 800px) {
  .Schedule {
    display: flex;
  }
  .calendar__body {
    display: block;
    width: 100%;
  }
  .calendar__table {
    height: 80px;
    display: flex;
    border: solid 2px black;
    margin-bottom: 5px;
  }
  .calendar__item__header {
    display: block;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 15%;
    border-right: dotted 1px black;
  }
  .calendar__day {
    font-size: 1.2em;
    font-weight: bold;
  }
  .todo__addMenu--schedule {
    display: flex;
    justify-content: center;
  }
  .calendar__item__body {
    width: 85%;
  }
  .calendar__todo {
    color: black;
  }
}
</style>
