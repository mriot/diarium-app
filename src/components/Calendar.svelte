<script>
  import Datepicker from "praecox-datepicker";
  import { selectedDate } from "../stores/appStore";
  import "../scss/calendar.scss";

  export let viewDate;

  const { api } = window; // electron

  let marked = ["2021-10-20"];

  (async () => {
    const records = await api.getAllRecords();
    marked = records.map((r) => r.date);
  })();
</script>

<Datepicker bind:selected={$selectedDate} {marked} {viewDate} finishBtn={false} />
