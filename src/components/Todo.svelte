<script>
  import { fade } from "svelte/transition";
  export let todo;
  export let done;
  export let remove;
</script>

<style>
  label {
    cursor: pointer;
    font-size: 24px;
    padding: 20px;
    border-radius: 12px;
    position: relative;
    display: block;
    user-select: none;
    color: #333;
    background: #fff;
    border: 1px solid #e8e9ed;
    margin-bottom: 30px;
    box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.12);
  }

  input[type="checkbox"] {
    display: none;
  }

  button {
    cursor: pointer;
    outline: none;
    position: absolute;
    top: 18px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: no-repeat 50% 50%
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23676778' d='M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M17,7H14.5L13.5,6H10.5L9.5,7H7V9H17V7M9,18H15A1,1 0 0,0 16,17V10H8V17A1,1 0 0,0 9,18Z'%3E%3C/path%3E%3C/svg%3E");
    background-size: 30px 30px;
    border: none;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    text-indent: -9999px;
  }

  label:hover button {
    opacity: 1;
  }

  label:hover button:hover {
    opacity: 0.7;
  }
</style>

<svelte:options immutable={true} />
<label in:fade|intro>
  <input type="checkbox" on:change={done} />
  {todo.title}
  <button on:click={remove}>remove</button>
</label>
