<script>
  import { fade } from "svelte/transition";
  import Nav from "./Nav.svelte";
  import { editMode } from "../stores/appStore";
  import Editor from "./Editor.svelte";
  import dayjs from "dayjs";
  import Calendar from "./Calendar.svelte";
  import { selectedDate, dayRecord } from "../stores/appStore";

  let prevDate;
  let viewDate = new Date();

  // fetch record for selected date
  $: {
    if (!prevDate || !dayjs($selectedDate).isSame(prevDate, "day")) {
      (async () => {
        try {
          const record = await api.getRecord($selectedDate);
          $dayRecord = record[0];
        } catch (error) {
          alert("Could not fetch record\n\n" + error.toString());
          console.error(error);
        }
      })();
    }

    prevDate = $selectedDate;
  }
</script>

<div id="root" transition:fade>
  <Nav />
  <main>
    <div id="sidebar">
      <div class="today" on:click={() => (viewDate = new Date())}>{dayjs(viewDate).format("dddd, DD. MMMM YYYY")}</div>
      <Calendar {viewDate} />
    </div>
    <!-- TODO classnames / theming -->
    <div id="content-container" class="toastui-editor-dark" style="background-color: #20232a;">
      {#if $editMode}
        <Editor content={$dayRecord?.content} />
      {:else}
        {#key $dayRecord}
          <div class="content toastui-editor-contents" in:fade>
            {#if $dayRecord?.content}
              {@html $dayRecord?.content}
            {:else}
              <h1 class="such-empty">Wow such empty 🌚</h1>
            {/if}
          </div>
        {/key}
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
    overflow-y: hidden;
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
    background-color: #fff;
  }

  .content {
    padding: 1em;
    height: 100%;
    overflow: auto;

    .such-empty {
      border: none;
      text-align: center;
      transform: translateY(30vh);
    }
  }
</style>
