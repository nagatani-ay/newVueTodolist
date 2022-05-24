<template>
  <h1 class="content__title">Schedule</h1>
  <schedule
    :todoList="todoList"
    :viewStyle="viewStyle"
    @delete:item="$emit('delete:item', $event)"
    @update:item="$emit('update:item', $event)"
    @update:status="$emit('update:status', $event)"
    @create:item="$emit('create:item', $event)"
  ></schedule>
</template>

<script>
import Schedule from '../components/Schedule/Schedule.vue';
export default {
  components: { Schedule },
  props: ['todoList', 'viewStyle'],
  emits: [
    'delete:item',
    'update:item',
    'update:status',
    'create:item',
    'clear:item',
  ],
  setup() {},
};
</script>

<style>
.content__title {
  text-align: center;
}
</style>
