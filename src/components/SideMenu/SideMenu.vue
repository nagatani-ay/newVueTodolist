<template>
  <div class="sidemenu">
    <button class="sidemenu__button" @click="toggleSideMenu">=</button>
    <transition name="slide-fade">
      <div v-if="isOpenSideMenu">
        <ul class="sidemenu__list">
          <menu-item
            class="sidemenu__list__item"
            v-for="menuItem in contentList"
            @click="toggleSideMenu"
            :menuName="menuItem"
          ></menu-item>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
import { ref } from 'vue';
export default {
  name: 'sidemenu',
  components: { MenuItem },
  props: ['source'],
  emits: ['showContent'],
  setup() {
    let isOpenSideMenu = ref(false);
    function toggleSideMenu() {
      isOpenSideMenu.value = !isOpenSideMenu.value;
    }
    const contentList = ref(['TodoList', 'Schedule']);
    return {
      isOpenSideMenu,
      toggleSideMenu,
      contentList,
    };
  },
};
</script>

<style scoped>
.sidemenu {
  display: flex;
  padding: 10px;
  align-items: center;
}

.sidemenu__button {
  width: 30px;
  height: 30px;
  z-index: 1;
}
.sidemenu__list {
  display: flex;
}

.sidemenu__list__item {
  margin: 0 5px;
}
li:hover {
  background-color: #f5f5f5;
}
</style>
