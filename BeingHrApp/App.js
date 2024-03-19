import "react-native-gesture-handler";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import OtpScreen from "./components/OtpScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#0a66c2",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#000",
          },
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignupScreen} />
        <Stack.Screen
          name="OTP"
          component={OtpScreen}
          options={{ headerTitle: "OTP" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
