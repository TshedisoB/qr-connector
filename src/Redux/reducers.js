import { SET_SCANNED, SET_CURRENT_CONTACT } from "./types";

const initialState = {
  scanned: false,
  currentContact: null,
};

export default function barCodeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCANNED:
      return {
        ...state,
        scanned: !state.scanned,
      };
    case SET_CURRENT_CONTACT:
      return {
        ...state,
        currentContact: action.payload,
      };
    default:
      return state;
  }
}
