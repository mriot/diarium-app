<script>
  export let value = "";
</script>

<button on:click>{value}</button>

<style lang="scss">
  button {
    position: relative;
    display: flex;
    align-items: center;
    color: #efefef;
    background-color: #363b47;
    cursor: pointer;
    text-decoration: none;
    padding: 0.75em 3em;
    margin: 1em auto 0;
    font-size: 1.25rem;
    border-radius: 5px;
    border: none;
    user-select: none;
    transition: all 0.2s;
    white-space: nowrap;
    text-decoration: none;
  }
</style>
