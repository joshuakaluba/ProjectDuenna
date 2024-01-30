import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useColorScheme from "../hooks/useColorScheme";
import ContactsScreen from "../screens/ContactsScreen";
import EditContactScreen from "../screens/EditContactScreen";
import SelectContactScreen from "../screens/SelectContactScreen";
import { Styles } from "../constants";
import AddContactScreen from "../screens/AddContactScreen";

const ContactStack = createNativeStackNavigator();

export default function ContactsStackScreen() {
  const theme = useColorScheme();
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{
          title: "Emergency Contacts",
          ...Styles.defaultScreenOptions(theme),
        }}
      />
      <ContactStack.Screen
        name="EditContactScreen"
        component={EditContactScreen}
        options={{
          title: "Edit Contact",
          ...Styles.defaultScreenOptions(theme),
        }}
      />
      <ContactStack.Screen
        name="AddContactScreen"
        component={AddContactScreen}
        options={{
          title: "Add Contact",
          ...Styles.defaultScreenOptions(theme),
        }}
      />
      <ContactStack.Screen
        name="SelectContactScreen"
        component={SelectContactScreen}
        options={{
          title: "Select Contacts To Add",
          ...Styles.defaultScreenOptions(theme),
        }}
      />
    </ContactStack.Navigator>
  );
}
