<template>
  <div class="todo__addMenu--schedule" v-if="source=='schedule'">
    <custom-button
      class="addSmallButton"
      v-if="!isOpen"
      @click="toggleMenu"
    >
    <i class="add--icon,addSmallButton"></i>
    </custom-button>
    <div v-if="isOpen">
      <label
        >Todo:
          <custom-textinput v-model="tempText"></custom-textinput>
      </label>
      <label
        >完了予定:
          <p type="date" >{{selectDate}}</p>
      </label>
    <div class="addMenuControl">
      <custom-button BtnText="cancel" @click="toggleMenu()"></custom-button>
      <custom-button BtnText="Add" @click="createEvent()"></custom-button>
    </div>
  <div class="todo__addMenu--todo" v-if="source=='todomenu'">
    <custom-button
      class="addBigButton"
      v-if="!isOpen"
      @click="toggleMenu"
      >
    <i class="add--icon,addBigButton"></i></custom-button>
    <div v-if="isOpen">
      <label
        >Todo:
          <custom-textinput v-model="tempText"></custom-textinput>
      </label>
      <label
        >完了予定:
          <input type="date" v-model="deadline" />
      </label>
    <div class="addMenuControl">
      <custom-button BtnText="cancel" @click="toggleMenu()"></custom-button>
      <custom-button BtnText="Add" @click="createEvent()"></custom-button>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue';
import CustomButton from '../Form/Button.vue';
import CustomTextinput from '../Form/TextInput.vue';
export default {
  props:["source","selectDate"],
  emits:["create:item"],
  components:{ CustomButton, CustomTextinput},
  setup(props,context) {
    const isOpen = ref(false);
    const tempText = ref('');
    const deadline = ref('');
    function toggleMenu() {
      isOpen.value = !isOpen.value;
      tempText.value = undefined;
      deadline.value = undefined;
    }

    function createEvent() {
      if (tempText.value == null) {
        alert('内容を入力してください');
      }else if(deadline.value == null) {
        alert('期限を入力してください');
      } else {
        if(source=="schedule"){
          context.emit('create:item', {
          text: tempText.value,
          deadline: selectDate,
          });
        }else{
     const [year, month, day] = deadline.value.split('-').map(Number);
        context.emit('create:item', {
          text: tempText.value,
          deadline: {
            year,
            month,
            day,
          },
        });
        }
   
        toggleMenu();
      }
    }

    return{
      toggleMenu,
      createEvent,
            isOpen,
      tempText,
      deadline,
    }
  },
};
</script>
<style>
.todo__addMenu {
  width: 100%;
  text-align: center;
  position: fixed;
  right: 0;
  bottom: 0;
}
.add--icon{
    background-image: url(https://stackblitz.com/files/vue-7r2a4b/github/nagatani-ay/newVueTodolist/master/src/img/addButton.png);
}

.addBigButton {
  position: relative;
  left: 85%;
  display: block;

  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.addSmallButton {
  display: block;

  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
