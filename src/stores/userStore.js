import { writable } from "svelte/store";

export const config = writable({});
export const loggedIn = writable(false);
export const secret = writable("");
