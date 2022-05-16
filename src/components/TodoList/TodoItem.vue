<template>
  <li>
    <custom-button :BtnText="EditBtnText" @click="onEdit()"></custom-button>
    <div class="todo__edititem" v-if="isEdit">
      <custom-button
        BtnText="delete"
        @click="
          $emit('delete:item');
          onEdit();
        "
      ></custom-button>

      <custom-textinput v-model="tempText"></custom-textinput>
      <custom-button
        BtnText="confirm"
        @click="
          $emit('update:item', tempText);
          onEdit();
        "
      ></custom-button>
    </div>
    <div class="todo__item" v-if="!isEdit">
      <custom-checkbox v-model="todo.status"></custom-checkbox>
      <p class="item__text">{{ todo.text }}</p>
      <p class="item__time">{{ todo.time }}</p>
    </div>
  </li>
</template>

<script>
import CustomButton from '../Form/Button.vue';
import CustomCheckbox from '../Form/CheckBox.vue';
import CustomTextinput from '../Form/TextInput.vue';

export default {
  name: 'TodoItem-Component',
  components: { CustomButton, CustomCheckbox, CustomTextinput },
  data() {
    return { isEdit: false, EditBtnText: 'edit', tempText: this.todo.text };
  },
  props: ['todo'],
  emits: ['update:item', 'delete:item'],
  methods: {
    onEdit() {
      this.isEdit = !this.isEdit;
      if (this.EditBtnText == 'edit') {
        this.EditBtnText = 'cancel';
      } else {
        this.EditBtnText = 'edit';
      }
    },
  },
};
</script>

<style>
li,
.todo__item,
.todo__edititem {
  display: flex;
  align-items: center;
}
</style>
