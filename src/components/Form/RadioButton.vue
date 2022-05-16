<template>
  <input type="radio" />
</template>

<script>
export default {
  name: 'RadioButton-Component',
  components: {},
  data() {
    return {};
  },
  props: ['modelValue', 'filter', 'group'],
  emits: ['update:modelValue'],
};
</script>

<style></style>
