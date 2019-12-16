<script>
  import { onDestroy } from "svelte";
  import { selectedNav, todos } from "../stores.js";

  let showNav = false;

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
    hideNav();
  }

  const selectedNavUnsubscribe = selectedNav.subscribe(nav => {
    localStorage.setItem("selectedNav", JSON.stringify(nav));
  });

  onDestroy(selectedNavUnsubscribe);

  function resetData() {
    todos.resetAll();
    hideNav();
  }

  function hideNav(e) {
    if (e.target.innerWidth >= 768) {
      showNav = false;
    }
  }

  window.addEventListener("resize", hideNav);

  onDestroy(() => {
    window.removeEventListener("resize", hideNav);
  });
</script>

<style>
  aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    z-index: 9;
    position: relative;
    min-width: 220px;
    background: #333639;
    padding: 26px;
  }

  .title {
    font-size: 28px;
    color: #fff;
    padding-bottom: 18px;
    border-bottom: 1px solid #4d5257;
  }

  .title i {
    color: #fff;
    margin-right: 4px;
  }

  .btn {
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

  .top {
    margin-top: 60px;
    flex-grow: 1;
  }

  .top,
  .bottom {
    align-self: flex-start;
  }

  input {
    display: none;
  }

  .bars {
    color: #333639;
  }

  .cross {
    color: #e2e3e5;
  }

  .bars,
  .cross {
    cursor: pointer;
    display: none;
    z-index: 99;
    position: absolute;
    top: 18px;
    left: 20px;
    animation: fadeIn 0.4s ease-in-out forwards;
  }

  .cross {
    left: 22.5px;
  }

  @media only screen and (max-width: 768px) {
    aside {
      display: none;
      padding: 0 28px;
      text-align: center;
      height: 100vh;
    }

    .title {
      padding-top: 20px;
      background: #252729;
      font-size: 32px;
      width: 100vw;
      margin-bottom: 20px;
      border-bottom: 1px solid #47484a;
    }

    .top {
      margin-top: 22px;
    }

    .btn {
      display: block;
      font-size: 26px;
    }

    .top,
    .bottom {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
      align-items: flex-start;
    }

    .bars {
      display: block;
    }

    input:checked ~ .bars {
      display: none;
    }

    input:checked ~ .cross {
      display: block;
    }

    input:checked ~ aside {
      display: flex;
      justify-content: flex-start;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      animation: fadeIn 0.4s ease-in-out forwards;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>

<input type="checkbox" id="leftPanel" bind:checked={showNav} />
<label class="bars" for="leftPanel">
  <i class="fas fa-bars fa-2x" />
</label>
<label class="cross" for="leftPanel">
  <i class="fas fa-times fa-2x" />
</label>
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
    <div class="btn" on:click={resetData}>
      <i class="fas fa-ban" />
      Reset Data
    </div>
    <a href="https://github.com/samnoh/svelte-todo-app" target="_blank">
      <div class="btn">
        <i class="fab fa-github" />
        GitHub
      </div>
    </a>
  </div>
</aside>
