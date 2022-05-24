<template>
  <div class="sidemenu">
    <button class="sidemenu__button" @click="toggleSideMenu">=</button>
    <transition name="slide-fade">
      <div v-if="isOpenSideMenu">
        <ul class="sidemenu__list">
          <menu-item
            class="sidemenu__list__item"
            v-for="menuItem in contentList"
            @select:content="
              $emit('showContent', $event);
              toggleSideMenu();
            "
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
