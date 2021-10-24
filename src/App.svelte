<script>
  import Login from "./components/login/Login.svelte";
  import Main from "./components/Main.svelte";
  import { loggedIn } from "./stores/userStore";
</script>

{#if !$loggedIn}
  <Login />
{:else}
  <Main />
{/if}
