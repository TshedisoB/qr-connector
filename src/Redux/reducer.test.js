import barCodeReducer from "./reducers";
import { SET_SCANNED, SET_CURRENT_CONTACT } from "./types";

describe("barCodeReducer", () => {
  it("should handle SET_SCANNED action", () => {
    const initialState = {
      scanned: false,
      currentContact: null,
    };

    const newState = barCodeReducer(initialState, { type: SET_SCANNED });

    expect(newState.scanned).toBe(true);
  });

  it("should handle SET_CURRENT_CONTACT action", () => {
    const initialState = {
      scanned: false,
      currentContact: null,
    };

    const contactData = {
      name: "Tshediso Boshiana",
      email: "tshediso.boshiana@umuzi.org",
    };

    const newState = barCodeReducer(initialState, {
      type: SET_CURRENT_CONTACT,
      payload: contactData,
    });

    expect(newState.currentContact).toEqual(contactData);
  });

  it("should return the initial state for unknown action types", () => {
    const initialState = {
      scanned: false,
      currentContact: null,
    };

    const newState = barCodeReducer(initialState, { type: "UNKNOWN_ACTION" });

    expect(newState).toEqual(initialState);
  });
});
