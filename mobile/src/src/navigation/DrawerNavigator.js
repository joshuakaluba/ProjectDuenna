import * as React from "react";
import * as Icon from "@expo/vector-icons";
import { useContext } from "react";
import { View, Alert, Linking } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import environment from "../../environment";
import Colors from "../constants/Colors";
import { AuthenticationContext } from "../hooks";
import StorageHelper from "../utilities/StorageHelper";
import ContactsStackScreen from "./ContactStack";
import SettingsStackScreen from "./SettingsStack";
import MonitorsStackScreen from "./MonitorsStack";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { setIsSignedIn } = useContext(AuthenticationContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <View
        style={{
          marginTop: 15,
          marginBottom: 15,
          borderTopColor: Colors.constants.white,
          borderTopWidth: 5,
        }}
      >
        <DrawerItem
          label="About"
          labelStyle={{ color: Colors.constants.white, fontWeight: "bold" }}
          icon={({ focused, size }) => {
            return (
              <Icon.FontAwesome
                name="info"
                size={25}
                color={
                  focused ? Colors.constants.lightGrey : Colors.constants.white
                }
              />
            );
          }}
          onPress={() => {
            Alert.alert(
              "About",
              `Version ${environment.versionKey}\n © 2023`,
              [
                {
                  text: "Ok",
                  onPress: () => {},
                },
              ]
            );
          }}
        />
        <DrawerItem
          label="Privacy Policy"
          labelStyle={{ color: Colors.constants.white, fontWeight: "bold" }}
          icon={({ focused, size }) => {
            return (
              <Icon.Octicons
                name="law"
                size={25}
                color={
                  focused ? Colors.constants.lightGrey : Colors.constants.white
                }
              />
            );
          }}
          onPress={async () => {
            await Linking.openURL("https://duenna.net/privacy.html");
          }}
        />
        <DrawerItem
          label="Sign Out"
          icon={({ focused, size }) => {
            return (
              <Icon.Ionicons
                name="exit"
                size={25}
                color={
                  focused ? Colors.constants.lightGrey : Colors.constants.white
                }
              />
            );
          }}
          labelStyle={{ color: Colors.constants.white, fontWeight: "bold" }}
          onPress={() => {
            Alert.alert("Sign out", "Are you sure you want to sign out?", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async () => {
                  await StorageHelper.clear();
                  setIsSignedIn(false);
                },
              },
            ]);
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: Colors.constants.darkGrey },
        headerShown: false,
        drawerActiveBackgroundColor: Colors.constants.blue,
        drawerActiveTintColor: Colors.constants.white,
        drawerInactiveTintColor: Colors.constants.white,
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        options={{
          title: "Monitoring",
          drawerIcon: ({ focused, size }) => {
            return (
              <Icon.Foundation
                name="home"
                size={25}
                color={
                  focused ? Colors.constants.lightGrey : Colors.constants.white
                }
              />
            );
          },
        }}
        component={MonitorsStackScreen}
      />
      <Drawer.Screen
        name="ContactStack"
        options={{
          title: "Emergency Contacts",
          drawerIcon: ({ focused, size }) => {
            return (
              <Icon.FontAwesome
                name="user"
                size={25}
                color={
                  focused ? Colors.constants.lightGrey : Colors.constants.white
                }
              />
            );
          },
        }}
        component={ContactsStackScreen}
      />
      <Drawer.Screen
        name="SettingsStack"
        options={{
          title: "Settings",
          drawerIcon: ({ focused, size }) => {
            return (
              <Icon.FontAwesome
                name="cog"
                size={25}
                color={
                  focused ? Colors.constants.lightGrey : Colors.constants.white
                }
              />
            );
          },
        }}
        component={SettingsStackScreen}
      />
    </Drawer.Navigator>
  );
}
