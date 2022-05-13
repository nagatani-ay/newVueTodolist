<template>
  <li @click="$emit('select:content', menuName)">{{ menuName }}</li>
</template>

<script>
export default {
  name: 'menuitem',
  components: {},
  data() {
    return {};
  },
  props: ['menuName'],
  emits: ['select:content'],
};
</script>

<style></style>
