<template>
  <button @click="isOpen = !isOpen">=</button>
  <div class="SideMenu" v-if="isOpen">
    <ul>
      <menu-item :menu="todolist"></menu-item>
    </ul>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
export default {
  name: 'sidemenu',
  components: { MenuItem },
  data() {
    return {
      isOpen: false,
    };
  },
  props: [],
  emits: ['select:content'],
};
</script>

<style>
.SideMenu {
  display: flex;
  flex-direction: column;
  border: solid 1px #000000;
}
li:hover {
  background-color: #f5f5f5;
}
</style>
