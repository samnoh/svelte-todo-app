<script>
  import { todos } from "./stores.js";
  import TodoList from "./components/TodoList.svelte";
</script>

<style>
  .todo-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    margin: 0 auto;
    width: 700px;
  }

  .todo-container > input {
    font-size: 1.4em;
    grid-column: 1/3;
  }
</style>

<main>
  <div class="todo-container">
    <input
      type="text"
      placeholder="Your todos..."
      on:keydown={e => e.which === 13 && todos.add(e.target)} />
    <TodoList />
  </div>
</main>
