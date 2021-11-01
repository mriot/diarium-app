<script>
  import { dayRecord, allRecords, viewDate } from "../stores/appStore";
  import dayjs from "dayjs";
  import isLeapYear from "dayjs/plugin/isLeapYear";

  const { api } = window;

  dayjs.extend(isLeapYear);

  let entriesInMonth = [];
  let entriesInYear = [];
  let entriesInMonthPercent = 0;
  let entriesInYearPercent = 0;

  $: entriesInMonth = $allRecords?.filter((record) => dayjs(record.date).isSame($viewDate, "month"));
  $: entriesInYear = $allRecords?.filter((record) => dayjs(record.date).isSame($viewDate, "year"));

  $: entriesInMonthPercent = (dayjs($viewDate).daysInMonth() / 100) * entriesInMonth.length;
  $: entriesInYearPercent = ((dayjs($viewDate).isLeapYear() ? 366 : 365) / 100) * entriesInYear.length;
</script>

<div class="diary-stats">
  Entries in {dayjs($viewDate).format("MMMM")}: {entriesInMonth.length} ({entriesInMonthPercent.toFixed(2)}%)<br />
  Entries in {dayjs($viewDate).format("YYYY")}: {entriesInYear.length}
  ({entriesInYearPercent.toFixed(2)}%)<br />
  Total entries: {$allRecords?.length || 0}
</div>

<style>
</style>
