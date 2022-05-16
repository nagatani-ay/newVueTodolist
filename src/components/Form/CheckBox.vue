<template>
  <input
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
  />
</template>

<script>
export default {
  name: 'CheckBox-Component',
  components: {},
  data() {
    return {};
  },
  props: ['modelValue'],
  emits: ['update:modelValue'],
};
</script>

<style></style>
