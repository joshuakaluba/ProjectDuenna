import * as React from "react";
import { useContext } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationContext } from "../hooks";
import AuthenticationStack from "./AuthenticationStack";
import DrawerNavigator from "./DrawerNavigator";
import useColorScheme from "../hooks/useColorScheme";
import { Colors } from "../constants";

export default function AppNavigator() {
  const theme = useColorScheme();
  const { isSignedIn } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={Colors.constants.darkGrey}
        barStyle={'light-content'}
      />
      {isSignedIn ? <DrawerNavigator /> : <AuthenticationStack />}
    </NavigationContainer>
  );
}
