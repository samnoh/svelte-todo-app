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

  label {
    display: block;
    position: relative;
    line-height: 1.2;
    padding: 0.5em 2.5em 0.5em 2em;
    margin: 0 0 0.5em 0;
    border-radius: 2px;
    user-select: none;
    border: 1px solid hsl(240, 8%, 70%);
    background-color: hsl(240, 8%, 93%);
    color: #333;
  }

  input[type="checkbox"] {
    position: absolute;
    left: 0.5em;
    top: 0.6em;
    margin: 0;
  }

  .done {
    border: 1px solid hsl(240, 8%, 90%);
    background-color: hsl(240, 8%, 98%);
  }

  button {
    outline: none;
    position: absolute;
    top: 0;
    right: 0.2em;
    width: 2em;
    height: 100%;
    background: no-repeat 50% 50%
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
    background-size: 1.4em 1.4em;
    border: none;
    opacity: 0;
    transition: opacity 0.2s;
    text-indent: -9999px;
    cursor: pointer;
  }

  label:hover button {
    opacity: 1;
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
    <div>
      {#each $todos.filter(t => t.done) as todo (todo.id)}
        <Todo
          {todo}
          remove={() => todos.remove(todo.id)}
          done={() => todos.done(todo, false)} />
      {/each}
    </div>
  {/if}
</div>
