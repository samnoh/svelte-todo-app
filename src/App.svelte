<script>
  export let name;
  console.log($$props);
  let count = 0;
  $: doubled = count * 2;

  $: if (count >= 10) {
    alert(`count is dangerously high!`);
    count = 9;
  }

  const handleClick = () => {
    count += 1;
  };
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Hello {name}</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps!
  </p>
  <button on:click={handleClick}>{count} {doubled}</button>
</main>
