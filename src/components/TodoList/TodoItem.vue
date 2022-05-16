<template>
  <li>
    <custom-button BtnText="btn"></custom-button>

    {{ todo.text }}
  </li>
</template>

<script>
import CustomButton from '../Form/Button.vue';
import CustomCheckbox from '../Form/CheckBox.vue';

export default {
  name: 'TodoItem-Component',
  components: { CustomButton, CustomCheckbox },
  data() {
    return {};
  },
  props: ['todo'],
};
</script>

<style></style>
