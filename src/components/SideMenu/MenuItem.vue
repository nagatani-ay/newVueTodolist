<template>
  <li @click="$emit('select:content', 'menu')">{{ menu }}</li>
</template>

<script>
export default {
  name: 'todolist',
  components: {},
  data() {
    return {};
  },
  props: ['menu'],
};
</script>

<style></style>
