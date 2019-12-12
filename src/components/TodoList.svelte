<script>
  import { fade } from "svelte/transition";
  import { todos, selectedNav } from "../stores.js";
  import Todo from "./Todo.svelte";

  import { navigators } from "./LeftPanel.svelte";
</script>

<style>
  .todo-container {
    padding: 30px 40px;
    flex-grow: 1;
    background: #fff;
    border-bottom-left-radius: 8%;
  }

  .todo-container input {
    background: #ebeffd;
    padding: 18px;
    margin-bottom: 42px;
    border-radius: 16px;
    border: none;
    width: 100%;
    font-size: 28px;
    outline: none;
    caret-color: #5351b8;
    color: #5351b8;
  }

  .todo-container input::placeholder {
    color: #aeabe3;
  }

  h2 {
    color: #5351b8;
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
      placeholder="Add to - do"
      on:keydown={e => e.which === 13 && todos.add(e.target)}
      autoFocus />
    <div in:fade>
      {#each $todos.filter(t => !t.done) as todo (todo.id)}
        <Todo
          {todo}
          remove={() => todos.remove(todo.id)}
          done={() => todos.done(todo, true)} />
      {/each}
    </div>
  {:else}
    <div in:fade>
      {#each $todos.filter(t => t.done) as todo (todo.id)}
        <Todo
          {todo}
          remove={() => todos.remove(todo.id)}
          done={() => todos.done(todo, false)} />
      {/each}
    </div>
  {/if}
</div>
