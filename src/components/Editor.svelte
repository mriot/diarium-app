<script>
  import { Editor as ToastEditor } from "@toast-ui/editor";
  import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
  import { onMount } from "svelte";

  let editor;

  onMount(() => {
    editor = new ToastEditor({
      el: document.querySelector("#toast-editor"),
      height: "100%",
      initialEditType: "markdown", // markdown / wysiwyg
      previewStyle: "vertical" // tab / vertical
    });
  });
</script>

<div id="toast-editor" />
