<template>
  <div class="SortMenu">
    <select class="sortSelect" v-model="sortType">
      <option v-for="sortType in sortTypeList">{{ sortType }}</option>
    </select>
    <button class="sortButton" :class="sortOrder" @click="setOrder"></button>
  </div>
</template>

<script>
import CustomButton from '../Form/Button.vue';
import { ref, watch } from 'vue';
export default {
  name: 'SortMenu-Component',
  components: { CustomButton },
  props: ['modelValue'],
  emits: ['update:modelValue', 'sort:item'],
  setup(props, context) {
    let sortOrder = ref('ascend');
    let sortType = ref('Text');
    const sortTypeList = ref(['Text', 'Status', 'Time', 'Deadline']);
    function setOrder() {
      if (sortOrder.value == 'ascend') {
        sortOrder.value = 'decend';
      } else {
        sortOrder.value = 'ascend';
      }
      context.emit('sort:item', {
        order: sortOrder.value,
        type: sortType.value,
      });
    }

    watch(sortType, (type, prevType) => {
      sortOrder.value = 'ascend';
    });
    return {
      sortOrder,
      setOrder,
      sortType,
      sortTypeList,
    };
  },
};
</script>

<style scoped>
.SortMenu {
  display: flex;
  align-items: center;
}
.sortButton {
  width: 20px;
  height: 20px;
}
.ascend {
}
.decend {
}
</style>
