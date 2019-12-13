<script>
  import { fade } from "svelte/transition";
  import { onDestroy } from "svelte";
  import { todos, selectedNav } from "../stores.js";
  import Todo from "./Todo.svelte";

  let _todos;
  let _done;
  let isTodoPage;

  const todoUnsubscribe = todos.subscribe(todos => {
    localStorage.setItem("todos", JSON.stringify(todos));
    _todos = $todos.filter(t => !t.done);
    _done = $todos.filter(t => t.done);
  });

  const selectedNavUnsubscribe = selectedNav.subscribe(({ index }) => {
    isTodoPage = $selectedNav.index === 0;
  });

  onDestroy(todoUnsubscribe);
  onDestroy(selectedNavUnsubscribe);
</script>

<style>
  .container {
    padding: 30px 40px;
    width: calc(100% - 220px);
    height: 97.5vh;
    background: #f0f1f7;
    border-bottom-left-radius: 45px;
    overflow-y: scroll;
  }
  .top {
    margin-bottom: 42px;
  }

  .top input {
    background: #e4e6f5;
    padding: 18px;
    border-radius: 16px;
    border: none;
    width: 100%;
    font-size: 28px;
    outline: none;
    caret-color: #333;
    color: #333;
    border: 1px solid #dfdfe6;
    margin-top: 20px;
  }

  .top input::placeholder {
    color: #cccdd9;
  }

  h2 {
    color: #333;
    font-size: 40px;
    font-weight: bold;
    user-select: none;
    text-indent: 8px;
    display: inline-block;
  }

  h2 span {
    font-size: 18px;
    color: #cccdd9;
    vertical-align: middle;
  }

  .reset-button {
    cursor: pointer;
    border: none;
    padding: 10px 15px;
    background: #e4e6f5;
    color: #333;
    border-radius: 8px;
    position: absolute;
    margin-top: -4px;
    right: 40px;
    outline: none;
  }

  .reset-button:hover {
    opacity: 0.7;
  }
</style>

<svelte:head>
  <title>
    {$selectedNav.title} ({isTodoPage ? _todos.length : _done.length}) |
    Sveltodos
  </title>
</svelte:head>
<div class="container">
  <div class="top">
    <h2 in:fade|intro>
      {$selectedNav.title}
      <span>({isTodoPage ? _todos.length : _done.length})</span>
    </h2>
    {#if isTodoPage}
      <input
        in:fade|intro
        placeholder="Add todo"
        on:keydown={e => e.which === 13 && todos.add(e.target)} />
    {:else}
      <button
        class="reset-button"
        on:click={() => todos.reset()}
        disabled={!_done.length}>
        <i class="fas fa-trash-restore fa-2x" />
      </button>
    {/if}
  </div>
  <div class="todo-container">
    {#each isTodoPage ? _todos.filter(t => !t.done) : _done.filter(t => t.done) as todo (todo)}
      <Todo
        {todo}
        remove={() => todos.remove(todo.id)}
        done={() => todos.done(todo, isTodoPage)}
        {isTodoPage} />
    {/each}
  </div>
</div>
