<template>
  <div id="container">
    <div class="sideMenu">
      <side-menu :source="'todomenu'"></side-menu>
    </div>
    <div class="mainContent">
      <router-view
        :todoList="todoList"
        :viewStyle="viewStyle"
        @delete:item="$emit('delete:item', $event)"
        @update:item="$emit('update:item', $event)"
        @update:status="$emit('update:status', $event)"
        @create:item="$emit('create:item', $event)"
        @clear:item="$emit('clear:item', $event)"
      ></router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu/SideMenu.vue';
export default {
  components: { SideMenu },
  props: ['todoList', 'viewStyle'],
  emits: [
    'delete:item',
    'update:item',
    'update:status',
    'create:item',
    'clear:item',
  ],
  setup() {},
};
</script>

<style>
#container {
  display: flex;
}
.sideMenu {
  width: 10%;
  max-width: 100px;
}
.mainContent {
  width: 90%;
}

@media screen and (max-width: 800px) {
  #container {
    display: block;
  }
  .sideMenu {
    display: flex;
    position: absolute;
  }
  .mainContent {
    width: 100%;
  }
}
</style>
