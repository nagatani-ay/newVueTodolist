<template>
  <button @click="addItem">test</button>
  <div class="todo__menu">
    <div class="todo__addMenu">
      <custom-button
        BtnText=""
        class="addMenuButton"
        v-if="!isOpen"
        @click="toggleMenu()"
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
    <div class="todo__menu__item">
      <custom-select
        :sortList="sortList"
        :modelValue="selectSort"
        @update:modelValue="
          selectSort = $event;
          $emit('sort:item', selectSort);
        "
      ></custom-select>
    </div>
    <div class="todo__menu__item">
      <label
        >Filter:
        <radio-button
          v-for="filterItem in filterList"
          :filter="filterItem"
          group="FilterMenu"
          v-model="selectFilter"
          @update:modelValue="$emit('update:filter', selectFilter)"
        ></radio-button>
      </label>
    </div>
    <custom-button BtnText="clear" @click="$emit('clear:item')"></custom-button>
  </div>
</template>

<script>
import CustomButton from '../Form/Button.vue';
import CustomTextinput from '../Form/TextInput.vue';
import CustomSelect from '../Form/SortSelector.vue';
import RadioButton from '../Form/RadioButton.vue';
import { ref } from 'vue';
import { addItem } from '../../App.vue';
const sortType = ['Text', 'Status', 'Time', 'Deadline'];
const filterType = ['全', '済', '未'];

export default {
  name: 'TodoMenu-Component',
  components: { CustomButton, CustomTextinput, CustomSelect, RadioButton },
  setup(props, context) {},
  data() {
    return {
      isOpen: false,
      tempText: '',
      deadline: '',
      selectFilter: '全',
      selectSort: '',
    };
  },
  props: ['todo'],
  emits: ['create:item', 'update:filter', 'clear:item', 'sort:item'],
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
      this.tempText = '';
      this.deadline = '';
    },
    createEvent() {
      if (this.tempText == '') {
        alert('内容を入力してください');
      } else {
        this.$emit('create:item', {
          text: this.tempText,
          deadline: this.deadline,
        });
        this.toggleMenu();
      }
    },
  },
  computed: {
    filterList: {
      get() {
        return filterType;
      },
    },
    sortList: {
      get() {
        return sortType;
      },
    },
  },
};
</script>

<style>
.todo__menu {
  display: flex;
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
