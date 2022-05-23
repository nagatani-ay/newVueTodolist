<template>
  <div class="todo__menu">
    <add-menu @create:item="$emit('create:item', $event)":source="'todomenu'"></add-menu>
    <!-- SortMenu -->
    <div class="">
      <sort-menu @sort:item="$emit('sort:item', $event)"></sort-menu>
    </div>
    <div class="todo__menu__item">
      <filter-menu
        @update:filter="$emit('update:filter', $event)"
      ></filter-menu>
    </div>
    <custom-button BtnText="clear" @click="$emit('clear:item')"></custom-button>
  </div>
</template>

<script>
import AddMenu from '../Form/AddMenu.vue';
import CustomButton from '../Form/Button.vue';
import CustomTextinput from '../Form/TextInput.vue';
import SortMenu from '../Form/SortMenu.vue';
import FilterMenu from '../Form/FilterMenu.vue';
import { ref, reactive, computed } from 'vue';

export default {
  name: 'TodoMenu-Component',
  components: { AddMenu, CustomButton, CustomTextinput, SortMenu, FilterMenu },
  props: ['todo'],
  emits: ['create:item', 'update:filter', 'clear:item', 'sort:item'],
  setup(props, context) {
    return {};
  },
};
</script>

<style>
.todo__menu {
  display: flex;
  align-items: center;
  text-align: center;
}


</style>
