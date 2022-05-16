<template>
  <div>
    <custom-button
      BtnText="add"
      v-if="!isOpen"
      @click="toggleMenu()"
    ></custom-button>
    <div v-if="isOpen">
      <custom-button BtnText="cancel" @click="toggleMenu()"></custom-button>
      <custom-textinput v-model="tempText"></custom-textinput>
      <custom-button BtnText="Add" @click="CreateItem()"></custom-button>
    </div>
    <custom-select :sortList="sortList"></custom-select>
    <radio-button></radio-button>
  </div>
</template>

<script>
import CustomButton from '../Form/Button.vue';
import CustomTextinput from '../Form/TextInput.vue';
import CustomSelect from '../Form/SortSelector.vue';
import RadioButton from '../Form/RadioButton.vue';

export default {
  name: 'TodoMenu-Component',
  components: { CustomButton, CustomTextinput, CustomSelect, Radiobutton },
  data() {
    return { isOpen: false, tempText: '' };
  },
  props: ['todo'],
  emits: ['create:item'],
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
};
</script>

<style></style>
