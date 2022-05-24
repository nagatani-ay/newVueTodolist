<template>
  <p>userSchedule</p>
  <schedule
    :todoList="todoList"
    :windowSize="windowSize"
    @delete:item="$emit('delete:item'), $event"
    @update:item="$emit('update:item'), $event"
    @update:status="$emit('update:status'), $event"
    @create:item="$emit('create:item'), $event"
  ></schedule>
</template>

<script>
import Schedule from '../components/Schedule/Schedule.vue';
export default {
  components: { Schedule },
  props: ['todoList', 'windowSize'],
  emits: ['delete:item', 'update:item', 'update:status', 'create:item'],
  setup() {},
};
</script>

<style></style>
