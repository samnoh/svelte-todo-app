<script>
  import LeftPanel from "./LeftPanel.svelte";
</script>

<style>
  main {
    display: flex;
    min-height: 100vh;
  }
</style>

<main>
  <LeftPanel />
  <slot />
</main>
