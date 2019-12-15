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
    height: 100vh;
    width: calc(100% - 220px);
    background: #f0f1f7;
    border-bottom-left-radius: 45px;
    overflow: hidden;
  }

  .body,
  .top > div {
    max-width: 1200px;
    margin: 0 auto;
  }

  .top {
    position: relative;
    z-index: 1;
    background: #f0f1f7;
    box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.15);
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
    box-shadow: none;
  }

  .top input::placeholder {
    color: #cccdd9;
  }

  .top > div {
    padding: 28px 48px;
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
    right: 38px;
    outline: none;
  }

  .reset-button:hover {
    opacity: 0.7;
  }

  .todo-container {
    padding: 30px 48px;
    overflow-y: scroll;
    height: calc(100vh - 187px);
  }

  .todo-container.done {
    height: calc(100vh - 96px);
  }

  .no-item {
    font-size: 28px;
    font-weight: bold;
    color: #cccdd9;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95%;
    user-select: none;
  }

  @media only screen and (max-width: 768px) {
    .container {
      width: 100%;
      border-bottom-left-radius: 0px;
    }

    .top > div {
      padding: 18px 12px;
    }

    .top input {
      margin-top: 28px;
      font-size: 22px;
      padding: 14px;
    }

    .todo-container {
      height: calc(100vh - 152px);
      padding: 30px 12px;
    }

    .todo-container.done {
      height: calc(100vh - 70px);
    }

    h2 {
      font-size: 28px;
      text-indent: 52px;
    }

    .reset-button {
      right: 16px;
      margin-top: -6px;
    }

    .no-item {
      font-size: 24px;
    }
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
    <div>
      <h2 in:fade|intro>
        {$selectedNav.title}
        <span>({isTodoPage ? _todos.length : _done.length})</span>
      </h2>
      {#if isTodoPage}
        <input
          in:fade|intro
          placeholder="Add to-do"
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
  </div>
  <div class="body">
    <div class="todo-container" class:done={!isTodoPage}>
      {#if isTodoPage ? !_todos.length : !_done.length}
        <div class="no-item">No Item</div>
      {:else}
        {#each isTodoPage ? _todos.filter(t => !t.done) : _done.filter(t => t.done) as todo (todo)}
          <Todo
            {todo}
            remove={() => todos.remove(todo.id)}
            done={() => todos.done(todo, isTodoPage)}
            {isTodoPage} />
        {/each}
      {/if}
    </div>
  </div>
</div>
