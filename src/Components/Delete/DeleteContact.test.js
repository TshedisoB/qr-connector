import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import * as sqlQueries from "../../sqlQueries/sqlQueries";
import DeleteContact from "./DeleteContact";

jest.mock("../../sqlQueries/sqlQueries", () => ({
  __esModule: true,
  deleteContact: jest.fn(),
}));

const contactData = [
  {
    name: "Tshediso Boshiana",
    email: "tshediso.boshiana@umuzi.org",
  },
];

describe("DeleteContact", () => {
  let tree;

  beforeEach(() => {
    tree = render(
      <NavigationContainer>
        <DeleteContact contact={contactData} />
      </NavigationContainer>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("should display the prompt when 'Delete Contact' trash icon is pressed", () => {
    const { getByTestId, getByText } = tree;

    fireEvent.press(getByTestId("delete-contact"));

    expect(
      getByText("Are you sure you want to delete this contact?")
    ).toBeDefined();
  });

  it("should `delete` a contact when `Delete` is button is pressed after prompting.", async () => {
    const { getByTestId, getByText } = tree;

    fireEvent.press(getByTestId("delete-contact"));

    expect(
      getByText("Are you sure you want to delete this contact?")
    ).toBeDefined();

    fireEvent.press(getByTestId("confirm-delete"));

    await waitFor(() => {
      expect(sqlQueries.deleteContact).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything()
      );
    });
  });

  it("should cancel contact deletion when 'Cancel' is pressed", () => {
    const { getByTestId, getByText } = tree;

    fireEvent.press(getByTestId("delete-contact"));

    expect(
      getByText("Are you sure you want to delete this contact?")
    ).toBeDefined();

    fireEvent.press(getByTestId("cancel-delete"));

    expect(sqlQueries.deleteContact).not.toHaveBeenCalled();
  });
});
