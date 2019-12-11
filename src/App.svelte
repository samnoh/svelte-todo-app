<script>

</script>

<style>
  .top {
    height: 58px;
  }

  .top input {
    outline: none;
    height: 100%;
    width: 100%;
    font-size: 28px;
    padding: 0 6px;
  }

  .todo-container {
    display: flex;
    min-height: 600px;
    height: 100vh;
  }
  .left,
  .right {
    flex-grow: 1;
    padding: 24px;
  }

  .divider {
    width: 1px;
    background: blue;
  }
</style>

<main>
  <div class="top">
    <input type="text" />
  </div>
  <div class="todo-container">
    <div class="left">left</div>
    <div class="divider" />
    <div class="right">right</div>
  </div>
</main>
