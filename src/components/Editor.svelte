<script>
  import { Editor as ToastEditor } from "@toast-ui/editor";
  import "@toast-ui/editor/dist/toastui-editor.css";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import dayjs from "dayjs";
  import { debounce, superSimpleHash } from "../utility";
  import { dayRecord } from "../stores/appStore";
  const { api } = window;

  export let content = "";

  let editor;

  onMount(() => {
    editor = new ToastEditor({
      el: document.querySelector("#toast-editor"),
      height: "100%",
      initialEditType: "markdown", // markdown / wysiwyg
      previewStyle: "vertical", // tab / vertical,
      events: {
        change: () => save(),
      },
    });

    editor.setHTML(content ? content : `<h1>${dayjs().format("DD.MM.YYYY")}</h1><p></p>`);

    // only when we populate the editor with default content
    if (!content) {
      editor.moveCursorToEnd();
    }
  });

  onDestroy(() => {
    editor.destroy();
  });

  const save = debounce(() => {
    const currentContent = editor.getHTML();
    if (content && superSimpleHash(content) !== superSimpleHash(currentContent)) {
      if ($dayRecord.id >= 0) {
        console.log("SAVE");
        dayRecord.update((record) => {
          return {
            ...record,
            content: currentContent,
          };
        });
        api.updateRecord($dayRecord);
      }
    }
    content = currentContent;
  });
</script>

<div id="toast-editor" in:fade />
