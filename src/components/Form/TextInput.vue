<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'TextInput-Component',
  props: ['modelValue'],
  emits: ['update:modelValue'],
};
</script>

<style></style>
