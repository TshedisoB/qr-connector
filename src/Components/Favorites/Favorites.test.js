import React from "react";
import { render } from "@testing-library/react-native";

import Favorites from "./Favorites";

jest.mock("../../sqlQueries/sqlQueries", () => ({
  __esModule: true,
  updateFavorites: jest.fn(),
  getAllContacts: jest.fn(),
}));

describe("Favorites component", () => {
  const contact = [
    {
      name: "Tshediso Boshiana",
      email: "tshediso.boshiana@umuzi.org",
    },
  ];

  it("should render correctly", () => {
    const tree = render(<Favorites contact={contact} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should display text 'Add to favorites' after scanning a QR code", () => {
    const { getByText } = render(<Favorites contact={contact} />);

    expect(getByText("Add to favorites")).toBeTruthy();
  });
});
