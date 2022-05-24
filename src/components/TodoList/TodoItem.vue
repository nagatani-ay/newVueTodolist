<template>
  <li >
    <custom-button v-if="sourceType == 'todolist'" @click="toggleEdit">edit</custom-button>
   
    <div class="EditMenu" v-if="isEdit">
      <div class="editMenuButton">
        <custom-button @click="toggleEdit">×</custom-button>
        <custom-button @click="$emit('delete:item'); toggleEdit;"><i class="delete--icon"></i></custom-button>
        <custom-Button @click="confirmEdit"><i class="confirm--icon"></custom-button>
      </div>
      <div class="editMenuInput">
        <custom-input type="text" v-model="tempText"></custom-input>
        <custom-input type="date" v-model="tempDeadline"></custom-input>
      </div>
    </div>
   
    <div class="todo__item" v-if="!isEdit">
      <custom-checkbox 
        :modelValue="todo.status" 
        @update:modelValue="$emit('update:status')">
      </custom-checkbox>
      <span @dblclick="toggleEdit">
        <span class="item__text">{{ todo.text }}</span>
        <span v-if="sourceType == 'todolist'" class="item__time">
          {{todo.time}}
        </span>
        <span v-if="sourceType == 'todolist'" class="item__dead">
          {{tempDeadline}}
        </span>
      </span>
    </div>
  </li>
</template>

<script>
import CustomButton from '../Form/Button.vue';
import CustomCheckbox from '../Form/CheckBox.vue';
import CustomInput from '../Form/TextInput.vue';
import { ref } from 'vue';
export default {
  name: 'TodoItem-Component',
  components: { CustomButton, CustomCheckbox, CustomInput },

  props: ['todo', 'source'],
  emits: ['update:item', 'delete:item', 'update:status'],
  setup(props, context) {
    const isEdit = ref(false);
    const sourceType = ref(props.source);
    const tempText = ref(props.todo.text);
    const tempDeadline = ref(getDeadline());

    function toggleEdit() {
      isEdit.value = !isEdit.value;
    }

    function confirmEdit() {
      console.log("test")
      toggleEdit();
      const [year, month, day] = tempDeadline.value.split('-').map(Number);
      context.emit('update:item', {
        code: props.todo.code,
        text: tempText.value,
        deadline: {
          year,
          month,
          day,
        },
      });
    }

    function getDeadline() {
      const list = Object.values(props.todo.deadline)
        .map((x) => x.toString().padStart(2, '0'))
        .join('-');
      return list;
    }

    function enter(){
        console.log(enter)
    }

    function leave(){
      console.log(leave)
    }

    return {
      isEdit,
      tempText,
      tempDeadline,
      toggleEdit,
      confirmEdit,
      sourceType,
      enter,
      leave,
    };
  },
};
</script>

<style>
button,i{
  margin:0;
  padding:0;
}

li,
.todo__item,
.todo__edititem {
  display: flex;
  flex-wrap:wrap;
  align-items: center;
  position:relative;
}

.EditMenu{
  position:absolute;
  top:0;
  background-color:white;
  z-index:2;
  border:solid 1px black;
}
.editMenuButton{
  display:flex;
}
.item__time {
  font-size: 0.6em;
  color: lightgrey;
  text-align: right;
}


.delete--icon {
  display: block;
  background-image: url(https://stackblitz.com/files/vue-7r2a4b/github/nagatani-ay/newVueTodolist/master/src/img/removeButton.png);
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.confirm--icon {
  display: block;
  background-image: url(https://stackblitz.com/files/vue-7r2a4b/github/nagatani-ay/newVueTodolist/master/src/img/confirmButton.png);
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}



.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
