import React from "react";
import renderer, { act } from "react-test-renderer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { render, screen } from "@testing-library/react-native";

import ContactDetails from "./ContactDetails";
import barCodeReducer from "../../Redux/reducers";

const Stack = createStackNavigator();
const store = createStore(barCodeReducer);

jest.mock("../../sqlQueries/sqlQueries", () => ({
  __esModule: true,
  getAllContacts: jest.fn(),
  updateFavorites: jest.fn(),
  addOrUpdateNotes: jest.fn(),
}));

describe("ContactDetails component", () => {
  const barcodeData = [
    {
      name: "Tshediso Boshiana",
      email: "tshediso.boshiana@umuzi.org",
      profilePicLink: "https://github.com/tshedisoB.png",
      website: "https://tshedisob.github.io/",
      status:
        "Just discovered a hidden gem of a cafe in the heart of the city! ☕ Highly recommend trying their signature caramel latte.",
    },
  ];

  let tree;

  beforeAll(async () => {
    await act(async () => {
      tree = renderer.create(
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Contact Details"
                component={ContactDetails}
                initialParams={{ barcodeData }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    });
  });

  it("should render `ContactDetails` component correctly", () => {
    act(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("should display data on the App when it's valid", async () => {
    const name = tree.root.findAllByProps({
      children: "Tshediso Boshiana",
    });
    const email = tree.root.findAllByProps({
      children: "tshediso.boshiana@umuzi.org",
    });
    const profileLink = tree.root.findAllByProps({
      testID: "profile-link",
    });
    const webLink = tree.root.findAllByProps({
      testID: "website-link",
    });

    expect(name.length).toBeGreaterThan(0);
    expect(email.length).toBeGreaterThan(0);
    expect(profileLink.length).toBeGreaterThan(0);
    expect(webLink.length).toBeGreaterThan(0);
  });

  it("should display `No data found` when data is invalid", () => {
    const invalidData = "Invalid QR Code";

    render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Contact Details"
              component={ContactDetails}
              initialParams={{ barcodeData: invalidData }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );

    expect(screen.getByTestId("invalid-data")).toBeTruthy();
    expect(screen.getByText("Invalid QR code data")).toBeTruthy();
  });
});
