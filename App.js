import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";

import store from "./src/Redux/store";
import ScanQr from "./src/Components/ScanQr/ScanQr";
import ContactList from "./src/Components/ContactList/ContactList";
import ContactDetails from "./src/Components/ContactDetails/ContactDetails";
import ScanButton from "./src/Components/ScanButton/ScanButton";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
          }}>
          <Stack.Screen
            name="Scan Qr Code"
            component={ScanQr}
            options={{ headerLeft: null }}
          />
          <Stack.Screen
            name="Contact List"
            component={ContactList}
            options={{ headerLeft: null }}
          />
          <Stack.Screen
            name="Contact Details"
            component={ContactDetails}
            options={{ headerLeft: null }}
          />
        </Stack.Navigator>
        <ScanButton />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
