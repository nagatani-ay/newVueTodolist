<template>
  <button @click="toggleSideMenu">=</button>
  <div class="SideMenu" v-if="isOpenSideMenu">
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
import { ref } from 'vue';
export default {
  name: 'sidemenu',
  components: { MenuItem },
  emits: ['showContent'],
  setup() {
    let isOpenSideMenu = ref(false);
    function toggleSideMenu() {
      isOpenSideMenu.value = !isOpenSideMenu.value;
    }
    const contentList = ref(['TodoList', 'Flow']);
    return {
      isOpenSideMenu,
      toggleSideMenu,
      contentList,
    };
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
