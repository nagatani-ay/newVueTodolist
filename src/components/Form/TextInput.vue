<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'TextInput-Component',
  props: ['modelValue', 'inputType'],
  emits: ['update:modelValue'],
};
</script>

<style></style>
