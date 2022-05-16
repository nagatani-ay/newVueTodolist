<template>
  <button @click="isOpen = !isOpen">=</button>
  <div class="SideMenu" v-if="isOpen">
    <ul>
      <menu-item
        v-for="menuItem in contentList"
        @select:content="$emit('showContent', $event)"
        :menuName="menuItem"
      ></menu-item>
    </ul>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
const contentList = ['TodoList', 'Flow'];
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
  computed: {
    contentList: {
      get() {
        return contentList;
      },
    },
  },
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
