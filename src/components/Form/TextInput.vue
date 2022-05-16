<template>
  <input type="text" :value ="modelValue" @click ="$emit('update:modelValue')></input>
</template>

<script>
export default {
  name: 'TextInput-Component',
  components: {},
  data() {
    return {};
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
};
</script>

<style></style>
