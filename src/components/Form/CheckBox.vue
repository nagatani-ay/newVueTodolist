<template>
  <input
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue')"
  />
</template>

<script>
export default {
  name: 'CheckBox-Component',
  props: ['modelValue'],
  emits: ['update:modelValue'],
};
</script>

<style>
input {
  padding: 0;
  margin: 0;
}
</style>
