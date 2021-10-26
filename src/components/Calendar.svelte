<script>
  import Datepicker from "praecox-datepicker";
  import "../scss/calendar.scss";

  export let selected;
  export let marked;
  export let disabled;
  export let viewDate;
</script>

<Datepicker {selected} {marked} {disabled} {viewDate} finishBtn={false} />
