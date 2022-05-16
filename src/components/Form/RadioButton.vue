<template>
  <label
    >{{ filter }}:
    <input
      type="radio"
      :value="filter"
      name="group"
      :checked="modelValue == filter"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
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
