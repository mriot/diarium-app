<script>
  import Datepicker from "praecox-datepicker";
  import "../scss/calendar.scss";

  export let marked;
  export let disabled;
  export let viewDate;
</script>

<Datepicker {marked} {disabled} {viewDate} finishBtn={false} />
