<script>
  import { Editor as ToastEditor } from "@toast-ui/editor";
  import "@toast-ui/editor/dist/toastui-editor.css";
  import "@toast-ui/editor/toastui-editor-dark.css";
  import "../scss/editor.scss";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import dayjs from "dayjs";
  import { debounce, superSimpleHash } from "../utility";
  import { dayRecord, selectedDate, allRecords } from "../stores/appStore";
  import SaveStatus from "./SaveStatus.svelte";
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

    // create a new entry when mounted and no dayRecord is available
    (async () => {
      if (!$dayRecord?.id) {
        const record = await api.addRecord({
          date: $selectedDate,
          content,
          tags: [],
        });

        if (record?.id) {
          $dayRecord = record;
          $allRecords = await api.getAllRecords();
        }
      }
    })();
  });

  const save = debounce(async () => {
    const currentContent = editor.getHTML();

    // only save when content differs or when a new entry is created (content is empty)
    if (superSimpleHash(content) !== superSimpleHash(currentContent) || $dayRecord.content?.length === 0) {
      if ($dayRecord?.id >= 0) {
        console.log("SAVE");
        dayRecord.update((record) => {
          return {
            ...record,
            content: currentContent,
          };
        });
        $dayRecord = await api.updateRecord($dayRecord);
      }
    }

    content = currentContent;
  });
</script>

<div id="toast-editor" in:fade />
{#if $dayRecord}
  <SaveStatus saveDate={$dayRecord?.updated_at} />
{/if}
