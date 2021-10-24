<script>
  import Fa from "svelte-fa";
  import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

  export let editor;
</script>

<nav>
  <h1>DIARIUM</h1>
  <button on:click={() => console.log(editor.getHTML())}>Get HTML</button>
  <button on:click={() => console.log(editor.getMarkdown())}>Get Markdown</button>
  <ul>
    <li class="nav-button">Lorem</li>
    <li class="nav-button">Lorem</li>
    <li class="nav-button">Ipsum</li>
    <li>
      <input type="text" class="input" placeholder="Search..." />
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
      font-size: 2rem;
    }

    ul {
      display: flex;
      align-items: center;
      gap: 1.5em;
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
