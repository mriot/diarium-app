<script>
  import { loggedIn, secret } from "../../stores/userStore.js";
  import { slide } from "svelte/transition";
  const { api } = window; // electron

  let dbPath = "";

  api.getConfig().then(config => (dbPath = config.dbPath));

  const login = async () => {
    // TODO: check database
    // TODO: check secret (try decrypting)
    // loggedIn.set(true);
  };
</script>

<div class="container" transition:slide>
  <h1>DIARIUM</h1>
  <div class="box">
    <div class="group">
      <span>Your Database</span>
      <input type="text" value={dbPath} />
      <button
        on:click={async () => {
          const result = await api.selectDb();
          console.log(result);

          if (!result.canceled) {
            // config.update(config => {
            //   config.dbPath = result.filePaths[0];
            //   return config;
            // });
            api.getConfig().then(config => (dbPath = config.dbPath));
          }
        }}>Select</button
      >
    </div>
    <div class="group">
      <span>Your Secret</span>
      <input type="text" bind:value={$secret} />
    </div>
    <button on:click={() => login()}>Launch</button>
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

    &::after {
      content: "";
      position: relative;
      width: 0.5em;
      height: 0.5em;
      border: 2px solid transparent;
      border-top-color: #efefef;
      border-right-color: #efefef;
      opacity: 0;
      transform: rotate(45deg) translate(-20px, 20px);
      transition-delay: 0;
      transition-duration: 0;
    }

    &:hover,
    &:focus {
      box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
      transition: all 0.4s ease 0s;

      &::after {
        opacity: 1;
        transform: rotate(45deg) translate(12px, -12px);
        transition: all 200ms ease;
        transition-delay: 100ms;
      }
    }

    &:active {
      box-shadow: inset 0 0px 0 -5px rgba(0, 0, 0, 0.17);
    }
  }
</style>
