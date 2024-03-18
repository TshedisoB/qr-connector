import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { render, screen } from "@testing-library/react-native";

import ContactList from "./ContactList";
import barCodeReducer from "../../Redux/reducers";

const Stack = createStackNavigator();
const store = createStore(barCodeReducer);

jest.mock("../../sqlQueries/sqlQueries", () => ({
  __esModule: true,
  getAllContacts: jest.fn(),
}));

jest.mock("../../Components/ScanQr/ScanQr", () => ({
  db: {
    getAllContacts: jest.fn((callback) => callback([])),
  },
}));

describe("ContactList component", () => {
  const tree = render(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Contact List" component={ContactList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  ).toJSON();

  it("should render `ContactList` component correctly", () => {
    expect(tree).toMatchSnapshot();
  });

  it("should display 'No Valid Contact Scanned' when data is empty", () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Contact List" component={ContactList} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );

    expect(screen.getByTestId("null-contacts-list")).toBeTruthy();
    expect(screen.getByText("No Valid Contact Scanned 😔")).toBeTruthy();
  });
});
