<template>
  <div class="firebase-todo">
    <div class="title has-text-centered">
      Firebase Todo
    </div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="newTodoContent" class="input" type="text" placeholder="Add Todo">
        </p>
        <p class="control">
          <button class="button is-info" :disabled="!newTodoContent">
            Add
          </button>
        </p>
      </div>
    </form>

    <div class="card mb-5" v-for="todo in todos" :key="todo" :class="{ 'has-background-success-light': todo.done }">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{ 'has-text-success line-through': todo.done }">{{ todo.content }}</div>
            <div class="column is-5 is-text-right">
              <button class="button" :class="todo.done ? 'is-success' : 'is-light'"
                @click="toggleDone(todo.id)">&check;</button>
              <button class="button is-danger ml-2" @click="deleteTodo(todo.id)">&cross;</button>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
/* 
  imports
*/
import { ref, onMounted } from 'vue';
import {
  collection, onSnapshot,
  addDoc, deleteDoc, doc, updateDoc,
  query, orderBy
} from "firebase/firestore";
import { db } from '@/firebase'

//firebase refs
const todosCollectionRef = collection(db, "todos")
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

/* 
  todos
*/
const todos = ref([
  // {
  //   id: 'id1',
  //   content: 'Abel tesfaye',
  //   done: false
  // },
  // {
  //   id: 'id2',
  //   content: 'laurel arnell',
  //   done: true
  // }
])
/* 
    get todos
*/
onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
    });
    todos.value = fbTodos
  });

})


/*
  add todo
*/
const newTodoContent = ref('')

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now()
  });
  newTodoContent.value = ''
}

/*
  delete todo
*/
const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef, id));
}

/*
  toggle done
*/
const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  });

}

</script>

<style>
@import 'bulma/css/bulma.min.css';

.firebase-todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}
</style>