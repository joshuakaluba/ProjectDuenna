import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Styles } from "../constants";
import { useColorScheme } from "../hooks";
import { MonitorsScreen, AddNoteScreen } from "../screens";

const MonitorsStack = createNativeStackNavigator();

export default function MonitorsStackScreen() {
  const theme = useColorScheme();

  return (
    <MonitorsStack.Navigator initialRouteName="MonitorScreen">
      <MonitorsStack.Screen
        name="MonitorScreen"
        component={MonitorsScreen}
        options={{
          title: "Monitoring",
          ...Styles.defaultScreenOptions(theme),
        }}
      />
      <MonitorsStack.Screen
        name="AddNoteScreen"
        component={AddNoteScreen}
        options={{
          title: "Add Note",
          ...Styles.defaultScreenOptions(theme),
        }}
      />
    </MonitorsStack.Navigator>
  );
}
