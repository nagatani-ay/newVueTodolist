<template>
  <div class="todo__menu">
    <custom-button
      class="addMenuButton"
      BtnText="add"
      v-if="!isOpen"
      @click="toggleMenu()"
    ></custom-button>
    <div v-if="isOpen">
      <custom-button BtnText="cancel" @click="toggleMenu()"></custom-button>
      <custom-textinput v-model="tempText"></custom-textinput>
      <custom-button BtnText="Add" @click="CreateItem()"></custom-button>
    </div>
    <div class="todo__menu__item">
      <custom-select :sortList="sortList"></custom-select>
    </div>
    <div class="todo__menu__item">
      <label
        >Filter:
        <radio-button
          v-for="filterItem in filterList"
          :filter="filterItem"
          group="FilterMenu"
          v-model="selectSort"
          @update:modelValue="$emit('update:filter', selectSort)"
        ></radio-button>
      </label>
    </div>
  </div>
</template>

<script>
import CustomButton from '../Form/Button.vue';
import CustomTextinput from '../Form/TextInput.vue';
import CustomSelect from '../Form/SortSelector.vue';
import RadioButton from '../Form/RadioButton.vue';

const sortType = ['Text', 'Status'];
const filterType = ['全', '完', '未'];

export default {
  name: 'TodoMenu-Component',
  components: { CustomButton, CustomTextinput, CustomSelect, RadioButton },
  data() {
    return { isOpen: false, tempText: '', selectSort: '全' };
  },
  props: ['todo'],
  emits: ['create:item', 'update:filter'],
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    CreateItem() {
      if (this.tempText == '') {
        alert('文字を入力してください');
      } else {
        this.$emit('create:item', this.tempText);
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

.todo__addMenu__Button {
  position: relative;
  left: 85%;
  display: block;
  background-image: url(../img/addButton.png);
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
