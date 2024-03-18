import React from "react";
import renderer, { act } from "react-test-renderer";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

import App from "./App";

function MockBarCodeScanner() {
  return <></>;
}

MockBarCodeScanner.requestPermissionsAsync = async function () {
  return { status: "granted" };
};

jest.mock("expo-barcode-scanner", () => ({
  __esModule: true,
  BarCodeScanner: MockBarCodeScanner,
}));

jest.mock("./src/sqlQueries/sqlQueries", () => ({
  __esModule: true,
  createTable: jest.fn(),
  insertToDataBase: jest.fn(),
  getAllContacts: jest.fn(),
}));

describe("App component: ", () => {
  let tree;

  beforeAll(async () => {
    await act(async () => {
      tree = renderer.create(<App />);
    });
  });

  it("should render 'App component' correctly", () => {
    act(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("should display button with text `Scan QR Code`", () => {
    const scanQRButton = tree.root.findByProps({
      testID: "scan-qr-button",
    });

    expect(scanQRButton.props.children).toEqual("Scan QR Code");
  });

  it("should display button with text `Contact List`", () => {
    const contactListButton = tree.root.findByProps({
      testID: "contact-list-button",
    });

    expect(contactListButton.props.children).toEqual("Contact List");
  });

  it("should be able to navigate to `Contact List` screen", async () => {
    const { getByTestId } = render(<App />);
    const contactListButton = getByTestId("contact-list-button");

    fireEvent.press(contactListButton);

    await waitFor(() => getByTestId("null-contacts-list"));

    expect(getByTestId("null-contacts-list")).toBeTruthy();
  });
});
