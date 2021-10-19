<script>
  import Datepicker from "praecox-datepicker";
  import Fa from "svelte-fa";
  import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
  import { fade } from "svelte/transition";

  let marked = ["2021-10-9"];
</script>

<div transition:fade>
  <nav>
    <h1>DIARIUM</h1>
    <ul>
      <li class="nav-button">Lorem</li>
      <li class="nav-button">Ipsum</li>
      <li>
        <input type="text" class="input" placeholder="Search..." />
      </li>
      <li class="nav-button"><Fa icon={faSignOutAlt} /></li>
    </ul>
  </nav>
  <main>
    <Datepicker {marked} />
    <div id="editor">Editor</div>
  </main>
</div>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #191919;
  }
  h1 {
    font-size: 2rem;
  }
  nav ul {
    display: flex;
    align-items: center;
    gap: 1.5em;
  }
  nav .nav-button {
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
  nav .nav-button:hover {
    background-color: #33363e;
  }

  main {
    display: flex;
    background-color: rgba(255, 0, 0, 0.1);
  }
  #editor {
    width: 100%;
    height: 500px;
    background-color: rgba(255, 0, 0, 0.1);
  }
</style>
