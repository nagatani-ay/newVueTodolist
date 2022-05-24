<template>
  <router-link :to="menuName">
    <li>{{ menuName }}</li>
  </router-link>
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
