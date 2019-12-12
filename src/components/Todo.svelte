<script>
  import { fade } from "svelte/transition";
  export let todo;
  export let done;
  export let remove;
</script>

<style>
  label {
    font-size: 20px;
    display: block;
    margin-bottom: 20px;
  }
</style>

<label>
  <input type="checkbox" on:change={done} />
  {todo.title}
  <button on:click={remove}>remove</button>
</label>
