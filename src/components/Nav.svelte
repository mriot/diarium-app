<script>
  import Fa from "svelte-fa";
  import { faPen, faPlus, faSave, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
  import TextInput from "./common/TextInput.svelte";
  import { editMode, dayRecord } from "../stores/appStore";
</script>

<nav>
  <h1>DIARIUM</h1>
  <ul>
    <li class="nav-button" on:click={() => editMode.update((state) => !state)} class:active={$editMode}>
      {#if $dayRecord?.id}
        {#if $editMode}
          <Fa icon={faSave} /> Save
        {:else}
          <Fa icon={faPen} /> Edit
        {/if}
      {:else}
        <Fa icon={faPlus} /> Create
      {/if}
    </li>
    <li>
      <TextInput class="input" placeholder="Search..." />
    </li>
    <li class="nav-button"><Fa icon={faSignOutAlt} /></li>
  </ul>
</nav>

<style lang="scss">
  nav {
    grid-column: 1/3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #191919;

    h1 {
      margin: 0.3em;
      font-size: 2rem;
    }

    ul {
      display: flex;
      align-items: center;
      gap: 0.5em;
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    .nav-button {
      position: relative;
      cursor: pointer;
      color: #9e9e9e;
      padding: 7px 20px;
      margin: 0 5px;
      border-radius: 3px;
      border-bottom: 1px solid transparent;
      backface-visibility: hidden;
      user-select: none;
      transition: all 0.2s;
    }
    .nav-button:hover {
      background-color: #33363e;
    }
  }
</style>
