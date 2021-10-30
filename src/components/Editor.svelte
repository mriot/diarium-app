<script>
  import { Editor as ToastEditor } from "@toast-ui/editor";
  import "@toast-ui/editor/dist/toastui-editor.css";
  import "@toast-ui/editor/toastui-editor-dark.css";
  import "../scss/editor.scss";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import dayjs from "dayjs";
  import { debounce, superSimpleHash } from "../utility";
  import { dayRecord, selectedDate } from "../stores/appStore";
  const { api } = window;

  export let content = "";

  let editor;

  onMount(() => {
    editor = new ToastEditor({
      el: document.querySelector("#toast-editor"),
      height: "100%",
      initialEditType: "markdown", // markdown / wysiwyg
      previewStyle: "vertical", // tab / vertical,
      theme: "dark",
      events: {
        change: () => save(),
      },
    });

    editor.setHTML(content ? content : `<h1>${dayjs($selectedDate).format("DD.MM.YYYY")}</h1><p></p>`);

    // only when we populate the editor with default content
    if (!content) {
      editor.moveCursorToEnd();
    }

    // create a new entry when mounted
    if (!$dayRecord?.id) {
      api
        .addRecord({
          date: $selectedDate,
          content,
          tags: [],
        })
        .then((data) => {
          if (data.length > 0) {
            $dayRecord = data[0];
          }
        });
    }
  });

  onDestroy(() => {
    editor.destroy();
  });

  const save = debounce(() => {
    const currentContent = editor.getHTML();
    // only save when content differs or when a new entry is created (content is empty)
    if (superSimpleHash(content) !== superSimpleHash(currentContent) || $dayRecord.content?.length === 0) {
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
