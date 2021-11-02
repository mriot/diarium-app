<script>
  import { portal } from "svelte-portal";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";

  dayjs.extend(relativeTime);

  export let saveDate;

  const saveTime = dayjs(saveDate);
  let output;

  if (dayjs().diff(saveTime, "hour") < 1) {
    output = "Saved " + saveTime.fromNow();
  } else if (dayjs().diff(saveTime, "day") < 1) {
    output = "Saved today at " + saveTime.format("HH:mm:ss");
  } else {
    output = "Saved at " + saveTime.format("dd, DD.MM.YYYY HH:mm:ss");
  }
</script>

<span use:portal={"#toast-editor .toastui-editor-mode-switch"} title={saveTime.format("dd, DD.MM.YYYY HH:mm:ss")}>
  {output}
</span>

<style lang="scss">
  span {
    position: absolute;
    left: 10px;
    bottom: 5px;
  }
</style>
