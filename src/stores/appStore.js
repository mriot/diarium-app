import { writable } from "svelte/store";

export const editMode = writable(false);
export const selectedDate = writable(new Date());
