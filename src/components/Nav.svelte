<script>
  import Fa from "svelte-fa";
  import { faPen, faPlus, faSave, faSignOutAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
  import { editMode, dayRecord, allRecords } from "../stores/appStore";
  import SearchResult from "./SearchResult.svelte";
  import { loggedIn } from "../stores/userStore";
  import { debounce } from "../utility";

  const { api } = window;

  let searchValue;
  let searchResults = [];

  const search = debounce(async () => {
    if (searchValue.length < 3) {
      searchResults = [];
      return;
    }
    const result = await api.search(searchValue);
    console.log(result);
    searchResults = result;
  }, 500);
</script>

<nav>
  <h1>DIARIUM</h1>
  <ul>
    {#if $editMode}
      <li
        class="nav-button"
        on:click={async () => {
          if (!$dayRecord.id) {
            alert(`Can't find record with id ${$dayRecord.id} to delte`);
            return;
          }

          if (confirm("Do you really want to delete this record?")) {
            api.deleteRecord($dayRecord.id);
            $editMode = false;
            $dayRecord = {};
            $allRecords = await api.getAllRecords();
          }
        }}
      >
        <Fa icon={faTrash} />&nbsp;&nbsp;Delete
      </li>
    {/if}
    <li class="nav-button" on:click={() => editMode.update((state) => !state)} class:active={$editMode}>
      {#if $dayRecord?.id}
        {#if $editMode}
          <Fa icon={faSave} />&nbsp;&nbsp;Save
        {:else}
          <Fa icon={faPen} />&nbsp;&nbsp;Edit
        {/if}
      {:else}
        <Fa icon={faPlus} />&nbsp;&nbsp;Create
      {/if}
    </li>
    <li>
      <input type="text" class="search-input" placeholder="Search..." bind:value={searchValue} on:keyup={search} />
    </li>
    <li class="separator" />
    <li class="nav-button" on:click={() => loggedIn.set(false)}><Fa icon={faSignOutAlt} /></li>
  </ul>

  {#if searchResults.length > 0}
    <div class="search-results">
      {#each searchResults as result}
        <SearchResult {result} />
      {/each}
    </div>
  {/if}
</nav>

<style lang="scss">
  nav {
    position: relative;
    grid-column: 1/3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9e9e9e;
    border-bottom: 1px solid #191919;

    > ul {
      display: flex;
      align-items: center;
      gap: 0.5em;
      margin: 0;
      padding: 0;
      list-style-type: none;

      > li {
        position: relative;
        margin: 0 0.5em;
      }
    }
  }

  h1 {
    color: #fff;
    margin: 0.3em;
    font-size: 2rem;
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
    min-width: min(300px, 30vw);
    font-size: inherit;
    color: inherit;
    margin-top: 0;
    border: none;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    background-color: #424347;
    transition: border 0.3s, box-shadow 0.2s, color 0.5s;
  }

  .search-results {
    position: absolute;
    top: 100%;
    right: 1px;
    z-index: 100;
  }
</style>
