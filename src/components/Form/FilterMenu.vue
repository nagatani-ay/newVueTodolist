<template>
  <div class="FilterMenu">
    <button @click="toggleFilterMenu">Filter</button>
    <div class="FilterOptionMenu" v-if="isOpenFilterMenu">
      <radio-button
        v-for="filterType in filterTypeList"
        :filter="filterType"
        group="FilterMenuButton"
        v-model="selectFilter"
      ></radio-button>
      <button
        @click="
          $emit('update:filter', selectFilter);
          toggleFilterMenu();
        "
      >
        実行
      </button>
    </div>
  </div>
</template>

<script>
import RadioButton from '../Form/RadioButton.vue';
import { ref } from 'vue';
export default {
  name: 'FilterMenu-Component',
  components: { RadioButton },
  props: ['modelValue', 'filter', 'group'],
  emits: ['update:filter'],
  setup() {
    let isOpenFilterMenu = ref(false);
    let selectFilter = ref('全');
    const filterTypeList = ref(['全', '済', '未']);

    function toggleFilterMenu() {
      isOpenFilterMenu.value = !isOpenFilterMenu.value;
    }
    return {
      selectFilter,
      filterTypeList,
      isOpenFilterMenu,
      toggleFilterMenu,
    };
  },
};
</script>

<style>
.FilterMenu {
  position: relative;
}

.FilterOptionMenu {
  display: flex;
  flex-direction: column;
  width: 100px;
  position: absolute;
  background-color: white;
  border: solid 1px black;
}
</style>
