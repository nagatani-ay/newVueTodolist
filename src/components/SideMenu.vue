<template>
  <button @click="isOpen = !isOpen">=</button>
  <div class="SideMenu" v-if="isOpen">
    <ul>
      <li @click="$emit('setContent', 'todolist')">todolist</li>
      <li>item</li>
      <li>item</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidemenu',
  components: {},
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style>
.SideMenu {
  display: flex;
  flex-direction: column;
  border: solid 1px #000000;
}
li:hover {
  background-color: #f5f5f5;
}
</style>
