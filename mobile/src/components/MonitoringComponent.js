import React, { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import moment from "moment";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Colors } from "../constants";
import { MonitoringContext, useInterval } from "../hooks";
import MonitorsService from "../services/MonitorsService";
import FullScreenLoadingComponent from "./FullScreenLoadingComponent";
import { View, Text } from "./Themed";

function calculateTimeLeft(targetTime) {
  const givenTime = moment(targetTime);
  const currentTime = moment();
  const timeDifference = givenTime.diff(currentTime);
  const duration = moment.duration(timeDifference);

  const formattedTime = moment
    .utc(duration.as("milliseconds"))
    .format("HH:mm:ss");

    return formattedTime ;
}

export default function MonitoringComponent() {
  const { isMonitoring, setIsMonitoring, monitor, setMonitor } =
    useContext(MonitoringContext);
  const [loading, setLoading] = useState(false);

  let [count, setTimeLeft] = useState("");
  let [visible, setVisible] = useState(true);

  useInterval(() => {
    setTimeLeft(calculateTimeLeft(monitor.timeWillTrigger));
    setVisible(!visible);
  }, 500);

  const _onCircularProgressPress = async () => {
    try {
      setLoading(true);
      if (isMonitoring == false) {
        const monitor = await MonitorsService.createMonitor({ active: true });
        setIsMonitoring(true);
        setMonitor(monitor);
      } else {
        Alert.alert(
          "Clear monitor",
          "Are you sure you want to clear this monitor?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: async () => {
                await MonitorsService.updateMonitor({
                  ...monitor,
                  active: false,
                });
                setIsMonitoring(false);
                setMonitor({});
              },
            },
          ]
        );
      }
    } catch (error) {
      Lib.showError(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <FullScreenLoadingComponent />;
  }

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={_onCircularProgressPress}>
        <AnimatedCircularProgress
          size={300}
          width={40}
          backgroundWidth={30}
          fill={
            isMonitoring &&
            !!monitor &&
            monitor.progressPercent &&
            monitor.progressPercent > 0
              ? monitor.progressPercent
              : 100
          }
          tintColor={
            isMonitoring
              ? !!monitor &&
                !!monitor.hasTriggered &&
                monitor.hasTriggered === true
                ? Colors.constants.lightGrey
                : Colors.constants.danger
              : Colors.constants.blue
          }
          style={{ marginBottom: 15 }}
          backgroundColor={Colors.constants.darkGrey}
        >
          {() => (
            <Text style={[styles.statusText]}>
              {isMonitoring
                ? !!monitor.hasTriggered && monitor.hasTriggered === true
                  ? `Triggered`
                  : `Stop Monitoring`
                : `Start Monitoring`}
            </Text>
          )}
        </AnimatedCircularProgress>
        {!!monitor && !!monitor.timeRemaining && (
          <Text style={[styles.remainingText]}>
            {visible? `Remaining: ${monitor.timeRemaining}`:' '}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  remainingText: { textAlign: "center", fontWeight: "bold", fontSize: 16 },
  statusText: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Inter-Black",
    fontWeight: "bold",
  },
});
