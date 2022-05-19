<template>
  <label>
    <input
      type="radio"
      :value="filter"
      name="group"
      :checked="modelValue == filter"
      @input="$emit('update:modelValue', $event.target.value)"
    />{{ filter }}
  </label>
</template>
<script>
import { ref } from 'vue';
export default {
  name: 'RadioButton-Component',
  props: ['modelValue', 'filter', 'group'],
  emits: ['update:modelValue'],
};
</script>

<style></style>
