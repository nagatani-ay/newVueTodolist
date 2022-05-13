<template>
  <li>
    <custom-button :BtnText="taaa"></custom-button>

    {{ todo.text }}
  </li>
</template>

<script>
import CustomButton from '../Form/Button.vue';
export default {
  name: 'TodoItem-Component',
  components: { CustomButton },
  data() {
    return {};
  },
  props: ['todo'],
};
</script>

<style></style>
