import { writable } from "svelte/store";

export const editMode = writable(false);
export const selectedDate = writable(new Date());
export const dayRecord = writable({});
export const allRecords = writable([]);
