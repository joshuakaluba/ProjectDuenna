import "react-native-gesture-handler";
import "expo-dev-client";
import React, { useState, useEffect } from "react";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import useColorScheme from "./src/hooks/useColorScheme";
import { AuthenticationContext, MonitoringContext } from "./src/hooks";
import StorageHelper from "./src/utilities/StorageHelper";
import { FullScreenLoadingComponent } from "./src/components";
import AppNavigator from "./src/navigation/AppNavigator";
import MonitorsService from "./src/services/MonitorsService";
import LocationService from "./src/services/LocationService";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import Lib from "./src/utilities/Lib";

const LOCATION_TASK_NAME = "background-location-task";

registerRootComponent(App);
export default function App() {
  const colorScheme = useColorScheme();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitor, setMonitor] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
  });

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const authenticationCredentials =
        await StorageHelper.getAuthenticationCredentials();
      // TODO better token validation.
      if (
        !!authenticationCredentials &&
        !!authenticationCredentials.token &&
        authenticationCredentials.token.length > 0
      ) {
        setIsSignedIn(true);
        await _updateMonitorAsync();
      }
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    (async () => {
      if(isSignedIn == false){
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Balanced,
        });
      }
    })();
  }, [isSignedIn]);

  const _updateMonitorAsync = async () => {
    try {
      const monitor = await MonitorsService.getActiveMonitor();
      if (!!monitor && monitor.active) {
        setIsMonitoring(monitor.active);
        setMonitor(monitor);
        console.log("monitor", monitor);
      } else {
        setIsMonitoring(false);
        setMonitor({});
      }
    } catch (error) {
      Lib.showError(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (isSignedIn && isMonitoring) {
          const monitor = await MonitorsService.getActiveMonitor();
          setIsMonitoring(!!monitor && monitor.active ? monitor.active : false);
          setMonitor(!!monitor && monitor.active ? monitor : {});

          let location = await Location.getCurrentPositionAsync({});

          if (!!monitor && monitor.id) {
            await LocationService.createMonitorLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              userMonitorId: monitor.id,
            });

            console.log('location', location);
            console.log(new Date().toISOString());
          }
        }
      } catch (error) {
        console.log("error-setInterval", error);
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      console.log("clearing interval");
    };
  }, [isSignedIn, isMonitoring]);

  if (loading) {
    return <FullScreenLoadingComponent />;
  }

  return (
    <AuthenticationContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <MonitoringContext.Provider
        value={{ isMonitoring, setIsMonitoring, monitor, setMonitor }}
      >
        <AppNavigator colorScheme={colorScheme} />
      </MonitoringContext.Provider>
    </AuthenticationContext.Provider>
  );
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error("Task Manager", error);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log("locations: ", locations);
  }
});
