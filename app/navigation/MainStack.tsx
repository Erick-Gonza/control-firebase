import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../../context/userContext";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Toast from "react-native-toast-message";
import StoreSetup from "../screens/StoreSetup";
import Home from "../screens/Home";
import Inventory from "../screens/Inventory";
import Sales from "../screens/Sales";
import Earnings from "../screens/Earnings";
import Metrics from "../screens/Metrics";
import Suggestions from "../screens/Suggestions";

export const MainStackNavigator = () => {
  const { user, isOwner } = useAuth();
  const Stack = createNativeStackNavigator();
  const InsideStack = createNativeStackNavigator();

  function InsideLayout() {
    return (
      <InsideStack.Navigator>
        {isOwner === false ? (
          <InsideStack.Screen name="StoreSetup" component={StoreSetup} />
        ) : (
          <>
            <InsideStack.Screen name="Home" component={Home} />
            <InsideStack.Screen name="Inventory" component={Inventory} />
            <InsideStack.Screen name="Sales" component={Sales} />
            <InsideStack.Screen name="Earnings" component={Earnings} />
            <InsideStack.Screen name="Metrics" component={Metrics} />
            <InsideStack.Screen name="Suggestions" component={Suggestions} />
          </>
        )}
      </InsideStack.Navigator>
    );
  }

  return (
    <>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </>
  );
};
