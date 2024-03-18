import React from "react";
import renderer, { act } from "react-test-renderer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import barCodeReducer from "../../Redux/reducers";
import ScanQr from "./ScanQr";

const Stack = createStackNavigator();
const store = createStore(barCodeReducer);

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

jest.mock("../../sqlQueries/sqlQueries", () => ({
  __esModule: true,
  createTable: jest.fn(),
  insertToDataBase: jest.fn(),
}));

describe("ScanQR component", () => {
  let tree;

  beforeAll(async () => {
    await act(async () => {
      tree = renderer.create(
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Scan Qr Code" component={ScanQr} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    });
  });

  it("should render ScanQr component correctly", () => {
    act(() => {
      expect(tree).toMatchSnapshot();
    });
  });

  it("should call `createTable` function when component mounts", () => {
    const createTableMock = require("../../sqlQueries/sqlQueries").createTable;

    expect(createTableMock).toHaveBeenCalled();
  });

  it("should display text 'Fit QR code in dotted square' on the screen", () => {
    const textToFind = "Fit QR code in dotted square";
    const textElements = tree.root.findAllByProps({ children: textToFind });

    expect(textElements.length).toBeGreaterThan(0);
  });

  it("should display text 'Scan QR code' on the screen", () => {
    const textToFind = "Scan Qr Code";
    const textElements = tree.root.findAllByProps({ children: textToFind });

    expect(textElements.length).toBeGreaterThan(0);
  });
});
