<template>
  <input
    type="radio"
    :id="filter"
    :value="filter"
    name="group"
    :checked="modelValue == filter"
    @input="$emit('update:modelValue', $event.target.value)"
  />
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
