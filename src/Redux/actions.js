import { SET_SCANNED, SET_CURRENT_CONTACT } from "./types";

export const setScanned = () => ({
  type: SET_SCANNED,
});

export const setCurrentContact = (contact) => ({
  type: SET_CURRENT_CONTACT,
  payload: contact,
});
