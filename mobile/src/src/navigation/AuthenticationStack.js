import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Icon from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

const Tab = createBottomTabNavigator();

export default function AuthenticationStack() {
  const theme = useColorScheme();
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Register") {
            iconName = focused ? "person-add" : "person-add-outline";
          } else if (route.name === "Login") {
            iconName = focused ? "log-in" : "log-in-outline";
          }
          return (
            <Icon.Ionicons
              name={iconName}
              size={focused ? 26 : 22}
              color={color}
            />
          );
        },
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: Colors.constants.darkGrey,
          },
          null,
        ],
        tabBarActiveTintColor: Colors.constants.white,
        tabBarInactiveTintColor: Colors.constants.lightGrey,
      })}
    >
      <Tab.Screen
        name="Register"
        options={{
          headerTitleStyle: {
            color: Colors.constants.white,
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: Colors[theme].tabHeaderBackgroundColor,
          },
        }}
        component={RegisterScreen}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitleStyle: {
            color: Colors.constants.white,
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: Colors[theme].tabHeaderBackgroundColor,
          },
        }}
      />
    </Tab.Navigator>
  );
}
