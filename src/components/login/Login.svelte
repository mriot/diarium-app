<script>
  import { loggedIn, secret } from "../../stores/userStore.js";
  import { slide } from "svelte/transition";
  import Fa from "svelte-fa";
  import { faDatabase, faFile, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
  const { api } = window; // electron

  let dbPath = "";
  api.getConfig("dbPath").then(data => (dbPath = data));

  const login = async () => {
    api.secret($secret);
    api.addRecord({
      date: new Date().getDate(),
      content: "<h1>Hello World!</h1>",
      tags: "lorem ipsum"
    });
  };
</script>

<div class="container" transition:slide>
  <h1>DIARIUM</h1>
  <div class="box">
    <div class="group">
      <span>Select your diary location</span>
      <div
        class="db-select"
        on:click={async () => {
          const result = await api.selectDb();
          if (result) {
            api.getConfig("dbPath").then(data => (dbPath = data));
          }
        }}
      >
        <input type="text" value={dbPath || "Not selected"} />
        <button class="button"><Fa icon={faFolderOpen} /></button>
      </div>
      <button
        class="button create-button"
        on:click={async () => {
          api.createDiarium();
        }}>Or create a new one</button
      >
    </div>
    <div class="group">
      <span>Your Secret</span>
      <input type="password" bind:value={$secret} placeholder="xxxxxxxxxxxxxxxxxxxx" />
    </div>
    <button class="button" on:click={() => login()}>Launch</button>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .box {
    display: flex;
    padding: 2em 4em;
    flex-direction: column;
    border-radius: 3px;
    color: #363b47;
    background-color: #ddd;
    box-shadow: 0 20px 20px -5px rgb(0 0 0 / 30%), 0 -10px 20px -5px rgb(0 0 0 / 10%);
  }

  h1 {
    font-size: 5rem;
    margin: 0.3em;
    color: #ddd;
  }

  .group {
    margin: 1em 0;

    span {
      font-size: 1.5rem;
    }
  }

  .db-select {
    display: flex;

    input {
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      direction: rtl;
      border-radius: 5px 0 0 5px;
    }

    .button {
      margin: 0;
      padding: 0 1.2em;
      border-radius: 0 5px 5px 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }

  input {
    appearance: none;
    width: 100%;
    color: #000;
    outline: none;
    border: none;
    border-radius: 3px;
    font-size: 1rem;
    margin-top: 0;
    padding: 0.75em;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    background-color: #eee;
    transition: border 0.3s, box-shadow 0.2s, color 0.5s;
  }

  .button {
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
    white-space: nowrap;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      background-color: lighten(#363b47, 10%);
    }
  }

  .create-button {
    width: 100%;
    margin-top: 0;
    padding: 0.5em 0;
    font-size: 0.8rem;
    display: block;
    text-align: center;
    background-color: darken(#363b47, 5%);
  }
</style>
