<script>
  import Datepicker from "praecox-datepicker";
  import { selectedDate, allRecords, viewDate as calendarViewDate } from "../stores/appStore";
  import "../scss/calendar.scss";
  import { onMount } from "svelte";
  const { api } = window; // electron

  export let viewDate;

  let store; // exposed calendar store

  onMount(async () => {
    $allRecords = await api.getAllRecords();
  });

  $: $calendarViewDate = $store?.viewDate;

  $: {
    store?.update((prev) => {
      return { ...prev, viewDate, selected: viewDate };
    });
  }

  $: {
    if ($allRecords.length) {
      store?.update((prev) => {
        return { ...prev, focused: $allRecords.map((r) => r.date) };
      });
    }
  }
</script>

<Datepicker bind:store bind:selected={$selectedDate} finishBtn={false} />
