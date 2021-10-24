<script>
  import Datepicker from "praecox-datepicker";
  import Fa from "svelte-fa";
  import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
  import { fade } from "svelte/transition";
  import Editor from "@toast-ui/editor";
  import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
  import { onMount } from "svelte";
  import Nav from "./Nav.svelte";

  let editor = null;

  onMount(() => {
    editor = new Editor({
      el: document.querySelector("#editor"),
      height: "500px",
      initialEditType: "markdown", // markdown / wysiwyg
      previewStyle: "vertical" // tab / vertical
      // theme: "dark"
    });
  });

  let marked = ["2021-10-9"];
</script>

<div id="root" transition:fade>
  <Nav {editor} />
  <main>
    <Datepicker {marked} />
    <div id="editor">
      <h1>This is some nice content</h1>
      <blockquote>This is a quote</blockquote>
      <a href="google.com">This is a link</a>
    </div>
  </main>
</div>

<style>
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

  #editor {
    width: 100%;
    background-color: #fff;
  }
</style>
