import { createEvent, createStore } from "effector";

export const setLoading = createEvent<boolean>();
export const resetLoading = createEvent();

export const $loading = createStore(false);
$loading.on(setLoading, (prevState, payload) => payload);

$loading.reset(resetLoading);
