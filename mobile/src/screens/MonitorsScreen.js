import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import HamburgerMenuIcon from "../components/HamburgerMenuItem";
import MonitoringComponent from "../components/MonitoringComponent";
import MoreInfoComponent from "../components/MoreInfoComponent";
import { FullScreenLoadingComponent } from "../components";

import { MonitoringContext } from "../hooks";
import MonitorsService from "../services/MonitorsService";
import PushNotificationService from "../services/PushNotificationService";
import StorageHelper from "../utilities/StorageHelper";

import { Colors } from "../constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

const renderScene = SceneMap({
  first: MonitoringComponent,
  second: MoreInfoComponent,
});

export default function MonitorsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { isMonitoring, setIsMonitoring, setMonitor } =
    useContext(MonitoringContext);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Session" },
    { key: "second", title: "More" },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HamburgerMenuIcon />,
    });
  });

  useFocusEffect(
    React.useCallback(() => {
      async function _getActiveMonitorAsync() {
        setLoading(true);
        try {
          const monitor = await MonitorsService.getActiveMonitor();
          setIsMonitoring(!!monitor && monitor.active ? monitor.active : false);
          setMonitor(!!monitor && monitor.active ? monitor : {});
        } catch (error) {
          console.error("MonitorScreen.useFocusEffect", error);
        }
        setLoading(false);
      }

      _getActiveMonitorAsync();
    }, [])
  );

  useEffect(() => {
    StorageHelper.getPushNotificationToken().then((token) => {
      console.log(token);
      if(token == null || token == undefined || token == ""){
        registerForPushNotificationsAsync().then(async (token) => {
          console.log("Saving token",token);
          await StorageHelper.savePushNotificationToken(token);
          try {
            await PushNotificationService.createPushNotification({ token: token });
          } catch (error) {
            console.error("MonitorsScreen.createPushNotification", error);
          }
          
        });
      }
    });
  }, []);

  if (loading) {
    return <FullScreenLoadingComponent />;
  }
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{
        backgroundColor: Colors.constants.darkGrey,
        borderTopWidth: 3,
        borderTopColor: Colors.constants.lightGrey,
      }}
    />
  );

  return isMonitoring ? (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  ) : (
    <MonitoringComponent />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  statusText: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Inter-Black",
    fontWeight: "bold",
  },
});
