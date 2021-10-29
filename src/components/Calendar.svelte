<script>
  import Datepicker from "praecox-datepicker";
  import { selectedDate, dayRecord } from "../stores/appStore";
  import "../scss/calendar.scss";
  const { api } = window; // electron

  export let viewDate;

  let store; // exposed calendar store

  // update calendar state when viewDate changes
  $: {
    store?.update((prev) => {
      return { ...prev, viewDate, selected: viewDate };
    });
  }

  $: {
    if ($dayRecord?.date) {
      store.update((prev) => {
        return { ...prev, focused: [...prev.focused, $dayRecord.date] };
      });
    }
  }

  (async () => {
    const records = await api.getAllRecords();
    store.update((prev) => {
      return { ...prev, focused: records.map((r) => r.date) };
    });
  })();
</script>

<!-- <button
  on:click={() => {
    store.update((prev) => {
      return { ...prev, viewDate: new Date() };
    });
  }}>jump to today</button
>

<button
  on:click={() => {
    store.update((prev) => {
      return { ...prev, focused: [...prev.focused, "2021-11-10", "2021-10-10"] };
    });
  }}>add marked</button
>

<button
  on:click={() => {
    store.update((prev) => {
      return { ...prev, view: "year" };
    });
  }}>set view to year</button
> -->

<Datepicker bind:store bind:selected={$selectedDate} finishBtn={false} />
