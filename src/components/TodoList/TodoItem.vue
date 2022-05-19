<template>
  <li>
    <custom-button :BtnText="EditBtnText" @click="toggleEdit"></custom-button>
    <div class="todo__edititem" v-if="isEdit">
      <custom-button
        BtnText="delete"
        @click="
          $emit('delete:item');
          toggleEdit;
        "
      ></custom-button>

      <custom-input type="text" v-model="tempText"></custom-input>
      <custom-input type="date" v-model="tempDeadline"></custom-input>
      <custom-button BtnText="confirm" @click="confirmEdit"></custom-button>
    </div>
    <div class="todo__item" v-if="!isEdit">
      <custom-checkbox
        :modelValue="todo.status"
        @update:modelValue="$emit('update:status')"
      ></custom-checkbox>
      <p class="item__text">{{ todo.text }}</p>
      <p class="item__time">{{ todo.time }}</p>
      <p class="item__dead">{{ todo.deadline }}</p>
    </div>
  </li>
</template>

<script>
import CustomButton from '../Form/Button.vue';
import CustomCheckbox from '../Form/CheckBox.vue';
import CustomInput from '../Form/TextInput.vue';
import { ref } from 'vue';
export default {
  name: 'TodoItem-Component',
  components: { CustomButton, CustomCheckbox, CustomInput },

  props: ['todo'],
  emits: ['update:item', 'delete:item', 'update:status'],
  setup(props, context) {
    let isEdit = ref(false);
    let EditBtnText = ref('edit');
    let tempText = ref(props.todo.text);
    let tempDeadline = ref(props.todo.deadline);

    function toggleEdit() {
      isEdit.value = !isEdit.value;
      if (EditBtnText.value == 'edit') {
        EditBtnText.value = 'cancel';
      } else {
        EditBtnText.value = 'edit';
      }
    }

    function confirmEdit() {
      toggleEdit();
      context.emit('update:item', {
        text: tempText.value,
        deadline: tempDeadline.value,
      });
    }
    return {
      isEdit,
      EditBtnText,
      tempText,
      tempDeadline,
      toggleEdit,
      confirmEdit,
    };
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

.item__time {
  font-size: 0.6em;
  color: lightgrey;
  text-align: right;
}
</style>
