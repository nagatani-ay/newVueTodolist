<template>
  <button>
    {{ BtnText }}
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button-Component',
  props: ['BtnText'],
};
</script>

<style></style>
