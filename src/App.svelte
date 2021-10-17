<script>
  import Login from "./components/login/Login.svelte";
  import Main from "./components/Main.svelte";

  let loggedIn = !false;
</script>

<main>
  App
  {#if !loggedIn}
    <Login />
  {:else}
    <Main />
  {/if}
</main>
