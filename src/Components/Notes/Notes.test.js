import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

import * as sqlQueries from "../../sqlQueries/sqlQueries";
import barCodeReducer from "../../Redux/reducers";
import Notes from "./Notes";

const store = createStore(barCodeReducer);

jest.mock("../../sqlQueries/sqlQueries", () => ({
  __esModule: true,
  addOrUpdateNotes: jest.fn(),
}));

describe("Notes component", () => {
  const contact = [
    {
      email: "tshediso.boshiana@umuzi.org",
      notes: "Initial notes",
    },
  ];

  it("should render correctly", () => {
    const { toJSON } = render(
      <Provider store={store}>
        <Notes contact={contact} />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should display initial notes", () => {
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <Notes contact={contact} />
      </Provider>
    );
    expect(getByDisplayValue("Initial notes")).toBeTruthy();
  });

  it("should update notes when edited", () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Notes contact={contact} />
      </Provider>
    );

    const notesInput = getByPlaceholderText("You can make notes here...");

    fireEvent.changeText(notesInput, "Updated notes");

    expect(notesInput.props.value).toBe("Updated notes");
  });

  it("should reset notes to initial value when Cancel button is pressed", () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Notes contact={contact} />
      </Provider>
    );

    const notes = "Updated notes for Tshediso";
    const inputText = getByPlaceholderText("You can make notes here...");

    fireEvent.changeText(inputText, notes);

    expect(inputText.props.value).toBe(notes);

    const cancelButton = getByText("Cancel");
    fireEvent.press(cancelButton);

    expect(inputText.props.value).toBe("Initial notes");
  });

  it("should call addOrUpdateNotes when Save button is pressed", () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Notes contact={contact} />
      </Provider>
    );

    const notes = "Updated notes for Tshediso";
    const inputText = getByPlaceholderText("You can make notes here...");

    fireEvent.changeText(inputText, notes);

    expect(inputText.props.value).toBe(notes);

    const saveButton = getByText("Save");
    fireEvent.press(saveButton);

    expect(sqlQueries.addOrUpdateNotes).toHaveBeenCalledWith(
      expect.any(Object),
      contact[0].email,
      notes
    );
  });
});
