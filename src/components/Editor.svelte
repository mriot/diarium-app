<script>
  import { Editor as ToastEditor } from "@toast-ui/editor";
  import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import dayjs from "dayjs";

  export let content = null;

  let editor;

  onMount(() => {
    editor = new ToastEditor({
      el: document.querySelector("#toast-editor"),
      height: "100%",
      initialEditType: "markdown", // markdown / wysiwyg
      previewStyle: "vertical" // tab / vertical
      // initialValue: content ? content : `# ${dayjs().format("DD.MM.YYYY")}`
    });

    editor.setHTML(content ? content : `# ${dayjs().format("DD.MM.YYYY")}`);

    // only when we populate the editor with default content
    if (!content) {
      editor.moveCursorToEnd();
    }
  });

  onDestroy(() => {
    editor.destroy();
  });
</script>

<div id="toast-editor" in:fade />
