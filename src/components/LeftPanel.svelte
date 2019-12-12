<script>
  const navigators = [
    { title: "To - Do", icon: "far fa-calendar-check", active: true },
    { title: "Done", icon: "fas fa-history", active: false }
  ];
</script>

<style>
  aside {
    position: relative;
    min-width: 220px;
    background: #353397;
    padding: 150px 25px;
  }

  .title {
    position: absolute;
    top: 25px;
    font-size: 30px;
    color: #fff;
    margin: 0 auto;
    padding-bottom: 14px;
    border-bottom: 1px solid #5351b8;
  }

  .title i {
    color: #fff;
  }

  .top .btn {
    margin-bottom: 28px;
  }

  .top .btn:last-child {
    margin-bottom: 0;
  }

  .btn {
    cursor: pointer;
    color: #5351b8;
    font-size: 20px;
    font-weight: bold;
  }

  .btn:hover {
    color: #e2e3e5;
  }

  .btn:hover i {
    color: #e2e3e5;
  }

  .btn i {
    width: 20px;
    margin-right: 20px;
  }

  .btn.active,
  .btn.active i {
    color: #e2e3e5;
  }

  .bottom {
    position: absolute;
    bottom: 25px;
  }
</style>

<aside>
  <div class="title">
    <i class="fas fa-layer-group" />
    <a href="/">Sveltodos</a>
  </div>
  <div class="top">
    {#each navigators as nav (nav.active)}
      <div class="btn">
        <i class={nav.icon} />
        {nav.title}
      </div>
    {/each}
  </div>
  <div class="bottom">
    <a href="https://github.com/samnoh/svelte-todo-app" target="_blank">
      <div class="btn">
        <i class="fab fa-github" />
        GitHub
      </div>
    </a>
  </div>
</aside>
