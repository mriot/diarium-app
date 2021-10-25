<script>
  import { fade } from "svelte/transition";
  import Nav from "./Nav.svelte";
  import { editMode } from "../stores/appStore";
  import Editor from "./Editor.svelte";
  import dayjs from "dayjs";
  import Calendar from "./Calendar.svelte";

  let disabled = ["2021-10-10"];
  let marked = ["2021-10-19"];
  let viewDate = new Date();
  let content = `<h1>This is some nice content</h1>
  <blockquote>This is a quote</blockquote>
  <a href="www.google.com">This is a link</a>
  <a href="./test2.html">Test Seite</a>`;
</script>

<div id="root" transition:fade>
  <Nav />
  <main>
    <div id="sidebar">
      <div class="today" on:click={() => (viewDate = new Date())}>{dayjs(viewDate).format("dddd, DD. MMMM YYYY")}</div>
      <Calendar {disabled} {marked} {viewDate} />
    </div>
    <div id="content-container">
      {#if $editMode}
        <Editor {content} />
      {:else}
        <div class="content toastui-editor-contents" in:fade>
          {@html content}
        </div>
      {/if}
    </div>
  </main>
</div>

<style lang="scss">
  #root {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
  }

  main {
    display: flex;
    width: 100%;
    grid-column: 1/3;
    justify-content: stretch;
  }

  #sidebar {
    height: 100%;
    border-right: 1px solid #191919;

    .today {
      cursor: pointer;
      text-align: center;
      padding: 0.5em;
      font-size: 1.25rem;
      font-weight: 300;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  #content-container {
    color: #000;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
  }

  .content {
    padding: 1em;
  }
</style>
