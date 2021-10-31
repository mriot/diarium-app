<script>
  import Fa from "svelte-fa";
  import { faPen, faPlus, faSave, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
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
      <input type="text" class="search-input" placeholder="Search..." />
    </li>
    <li class="separator" />
    <li class="nav-button"><Fa icon={faSignOutAlt} /></li>
  </ul>
</nav>

<style lang="scss">
  nav {
    grid-column: 1/3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9e9e9e;
    border-bottom: 1px solid #191919;
  }

  h1 {
    color: #fff;
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

    li {
      margin: 0 0.5em;
    }
  }

  .separator {
    width: 1px;
    align-self: stretch;
    margin: 0.5em;
    margin-right: -1em;
    background-color: #424347;
  }

  .nav-button {
    position: relative;
    cursor: pointer;
    padding: 0.3em 1.7em;
    border-radius: 3px;
    border-bottom: 1px solid transparent;
    backface-visibility: hidden;
    user-select: none;
    transition: all 0.2s;

    &.active {
      color: #00b7ff;
      border-color: #00b7ff;
      border-radius: 3px 3px 0 0;
    }

    &:hover {
      background-color: #33363e;
    }
  }

  .search-input {
    appearance: none;
    outline: none;
    padding: 0.5em 1em;
    font-size: inherit;
    color: inherit;
    margin-top: 0;
    border: none;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    background-color: #424347;
    transition: border 0.3s, box-shadow 0.2s, color 0.5s;
  }
</style>
