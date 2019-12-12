<script>
  import { fade } from "svelte/transition";
  import { onDestroy } from "svelte";
  import { todos, selectedNav } from "../stores.js";
  import Todo from "./Todo.svelte";

  const unsubscribe = todos.subscribe(todos => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  onDestroy(unsubscribe);
</script>

<style>
  .todo-container {
    padding: 30px 40px;
    flex-grow: 1;
    background: #f0f1f7;
    border-bottom-left-radius: 45px;
  }

  .todo-container input {
    background: #e4e6f5;
    padding: 18px;
    margin-bottom: 42px;
    border-radius: 16px;
    border: none;
    width: 100%;
    font-size: 28px;
    outline: none;
    caret-color: #333;
    color: #333;
  }

  .todo-container input::placeholder {
    color: #cccdd9;
  }

  h2 {
    color: #333;
    font-size: 40px;
    font-weight: bold;
    user-select: none;
    margin-bottom: 20px;
    text-indent: 10px;
  }
</style>

<div class="todo-container">
  <h2>{$selectedNav.title}</h2>
  {#if $selectedNav.index === 0}
    <input
      in:fade
      placeholder="Add todo"
      on:keydown={e => e.which === 13 && todos.add(e.target)} />
    <div in:fade>
      {#each $todos.filter(t => !t.done) as todo (todo)}
        <Todo
          {todo}
          remove={() => todos.remove(todo.id)}
          done={() => todos.done(todo, true)} />
      {/each}
    </div>
  {:else}
    <div in:fade>
      {#each $todos.filter(t => t.done) as todo (todo)}
        <Todo
          {todo}
          remove={() => todos.remove(todo.id)}
          done={() => todos.done(todo, false)} />
      {/each}
    </div>
  {/if}
</div>
