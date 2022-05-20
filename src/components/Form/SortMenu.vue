<template>
  <div class="SortMenu">
    <select class="sortSelect" v-model="sortType">
      <optgroup label="SortType">
        <option v-for="sortType in sortTypeList">{{ sortType }}</option>
      </optgroup>
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
    let sortOrder = ref('decend');
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
      sortOrder.value = 'decend';
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
  display: block;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.ascend {
  background-image: url(https://stackblitz.com/files/vue-7r2a4b/github/nagatani-ay/newVueTodolist/test/src/img/decend.png);
}
.decend {
  background-image: url(https://stackblitz.com/files/vue-7r2a4b/github/nagatani-ay/newVueTodolist/test/src/img/acend.png);
}
</style>
