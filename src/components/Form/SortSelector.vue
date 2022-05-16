<template>
  <label
    >Sort:
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="sort in sortList">{{ sort }}</option>
    </select>
  </label>
</template>

<script>
export default {
  name: 'SelectBox-Component',
  components: {},
  data() {
    return {};
  },
  computed: {},
  props: ['modelValue', 'sortList'],
  emits: ['update:modelValue'],
};
</script>

<style></style>
