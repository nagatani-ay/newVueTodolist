<template>
  <div class="todo__menu">
    <div class="todo__addMenu">
      <custom-button
        BtnText=""
        class="addMenuButton"
        v-if="!isOpen"
        @click="toggleMenu"
      ></custom-button>
      <div v-if="isOpen">
        <label
          >Todo:
          <custom-textinput v-model="tempText"></custom-textinput>
        </label>
        <label
          >完了予定:
          <input type="date" v-model="deadline" />
        </label>
        <div class="addMenuControl">
          <custom-button BtnText="cancel" @click="toggleMenu()"></custom-button>
          <custom-button BtnText="Add" @click="createEvent()"></custom-button>
        </div>
      </div>
    </div>
    <!-- SortMenu -->
    <div class="">
      <sort-menu @sort:item="$emit('sort:item', $event)"></sort-menu>
    </div>
    <div class="todo__menu__item">
      <filter-menu
        @update:filter="$emit('update:filter', $event)"
      ></filter-menu>
    </div>
    <custom-button BtnText="clear" @click="$emit('clear:item')"></custom-button>
  </div>
</template>

<script>
import CustomButton from '../Form/Button.vue';
import CustomTextinput from '../Form/TextInput.vue';
import SortMenu from '../Form/SortMenu.vue';
import FilterMenu from '../Form/FilterMenu.vue';
import { ref, reactive, computed } from 'vue';

export default {
  name: 'TodoMenu-Component',
  components: { CustomButton, CustomTextinput, SortMenu, FilterMenu },
  props: ['todo'],
  emits: ['create:item', 'update:filter', 'clear:item', 'sort:item'],
  setup(props, context) {
    let isOpen = ref(false);
    let tempText = ref();
    let deadline = ref();

    function toggleMenu() {
      isOpen.value = !isOpen.value;
      tempText.value = undefined;
      tempText.value = undefined;
    }

    function createEvent() {
      if (tempText.value == '') {
        alert('内容を入力してください');
      } else {
        context.emit('create:item', {
          text: tempText.value,
          deadline: deadline.value,
        });
        toggleMenu();
      }
    }

    return {
      isOpen,
      tempText,
      deadline,
      createEvent,
      toggleMenu,
    };
  },
};
</script>

<style>
.todo__menu {
  display: flex;
  align-items: center;
  text-align: center;
}

.todo__addMenu {
  width: 100%;
  text-align: center;
  position: fixed;
  right: 0;
  bottom: 0;
}
.addMenuButton {
  position: relative;
  left: 85%;
  display: block;
  background-image: url(https://stackblitz.com/files/vue-7r2a4b/github/nagatani-ay/newVueTodolist/master/src/img/addButton.png);
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
