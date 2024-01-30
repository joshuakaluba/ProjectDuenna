import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Styles } from "../constants";
import { useColorScheme } from "../hooks";
import { SettingsScreen } from "../screens";

const SettingsStack = createNativeStackNavigator();

export default function SettingsStackScreen() {
  const theme = useColorScheme();
  return (
    <SettingsStack.Navigator initialRouteName="SettingsScreen">
      <SettingsStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          ...Styles.defaultScreenOptions(theme),
        }}
      />
    </SettingsStack.Navigator>
  );
}
