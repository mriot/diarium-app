<script>
  export let result;
</script>

<!-- todo: link search result -->
<div class="search-result">
  <div class="date">{result.date}</div>
  <div class="content">
    {@html result.content}
  </div>
</div>

<style lang="scss">
  .search-result {
    outline: 1px solid #ccc;
    padding: 0.5em;
    margin-bottom: 1em;
    background-color: #262931;
  }

  .date {
    font-size: 1.5rem;
    padding: 0.2em;
    border-bottom: 1px solid #ccc;
  }

  .content {
  }
</style>
