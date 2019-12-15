<script>
  import { onDestroy } from "svelte";
  import { selectedNav } from "../stores.js";

  let navigators = [
    { title: "To-do", icon: "far fa-calendar-check", index: 0 },
    { title: "Done", icon: "fas fa-history", index: 1 }
  ];

  function activeNavigator(title) {
    navigators = navigators.map(nav => {
      if (nav.title === title) {
        selectedNav.navigate(nav);
        return nav;
      }
      return nav;
    });
  }

  const selectedNavUnsubscribe = selectedNav.subscribe(nav => {
    localStorage.setItem("selectedNav", JSON.stringify(nav));
  });

  onDestroy(selectedNavUnsubscribe);
</script>

<style>
  aside {
    position: relative;
    min-width: 220px;
    background: #333639;
    padding: 150px 25px;
  }

  .title {
    position: absolute;
    top: 25px;
    font-size: 30px;
    color: #fff;
    margin: 0 auto;
    padding-bottom: 14px;
    border-bottom: 1px solid #4d5257;
  }

  .title i {
    color: #fff;
    margin-right: 4px;
  }

  .top .btn {
    margin-bottom: 28px;
  }

  .top .btn:last-child {
    margin-bottom: 0;
  }

  .btn {
    cursor: pointer;
    color: #4d5257;
    font-size: 20px;
    font-weight: bold;
  }

  .btn:hover,
  .btn:hover i {
    transition: color 0.3s ease-in-out;
    color: #e2e3e5;
  }

  .btn i {
    width: 20px;
    margin-right: 14px;
  }

  .btn.active,
  .btn.active i {
    color: #e2e3e5;
  }

  .bottom {
    position: absolute;
    bottom: 25px;
    margin: 0 auto;
  }
</style>

<aside>
  <div class="title">
    <a href="/">
      <i class="fas fa-layer-group" />
      Sveltodos
    </a>
  </div>
  <div class="top">
    {#each navigators as { title, icon, index } (index)}
      <div
        class="btn"
        class:active={index === $selectedNav.index}
        on:click={() => activeNavigator(title)}>
        <i class={icon} />
        {title}
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
