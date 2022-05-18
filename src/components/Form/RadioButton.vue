<template>
  <label>
    <input
      type="radio"
      :id="filter"
      :value="filter"
      name="group"
      :checked="modelValue == filter"
      @input="$emit('update:modelValue', $event.target.value)"
    />{{ filter }}
  </label>
</template>

<script>
export default {
  name: 'RadioButton-Component',
  props: ['modelValue', 'filter', 'group'],
  emits: ['update:modelValue'],
};
</script>

<style></style>
