<template>
  <router-link :to="menuName">
    <li class="sidemenu__item">{{ menuName }}</li>
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

<style>
.sidemenu__item:hover {
  background-color: #f5f5f5;
}
</style>
