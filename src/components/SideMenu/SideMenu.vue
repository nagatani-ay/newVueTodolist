<template>
  <button @click="isOpen = !isOpen">=</button>
  <div class="SideMenu" v-if="isOpen">
    <ul>
      <menu-item
        @select:content="$emit('showContent', $event)"
        menuName="todolist"
      ></menu-item>
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
  emits: ['showContent'],
  methods: {},
};
</script>

<style>
.SideMenu {
  display: flex;
  flex-direction: column;
}
li:hover {
  background-color: #f5f5f5;
}
</style>
