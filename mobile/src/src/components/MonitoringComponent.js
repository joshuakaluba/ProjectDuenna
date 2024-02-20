import React, { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import moment from "moment";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Colors } from "../constants";
import { MonitoringContext, useInterval } from "../hooks";
import MonitorsService from "../services/MonitorsService";
import FullScreenLoadingComponent from "./FullScreenLoadingComponent";
import PrimaryButton from "./PrimaryButton";
import * as Icon from "@expo/vector-icons";
import { View, Text } from "./Themed";

function calculateTimeLeft(targetTime) {
  const givenTime = moment(targetTime);
  const currentTime = moment();
  const timeDifference = givenTime.diff(currentTime);
  const duration = moment.duration(timeDifference);

  const formattedTime = moment
    .utc(duration.as("milliseconds"))
    .format("HH:mm:ss");

  return formattedTime;
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
                setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <FullScreenLoadingComponent />;
  }

  const isTriggered = !!monitor.hasTriggered && monitor.hasTriggered === true;
  const statusColor = isTriggered
    ? Colors.constants.danger
    : Colors.constants.alternativeDarkGrey;
  let statusText;

  const tintColor = isMonitoring
    ? !!monitor && !!monitor.hasTriggered && monitor.hasTriggered === true
      ? Colors.constants.lightGrey
      : Colors.constants.danger
    : Colors.constants.blue;

  if (isMonitoring) {
    if (isTriggered) {
      statusText = visible ? "Triggered" : " ";
    } else {
      statusText = "Stop Monitoring";
    }
  } else {
    statusText = "Start Monitoring";
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.box, styles.body]}>
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
            tintColor={tintColor}
            style={{ marginBottom: 15 }}
            backgroundColor={Colors.constants.darkGrey}
          >
            {() => (
              <>
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {statusText}
                </Text>

                <Icon.MaterialCommunityIcons
                  name={
                    isMonitoring
                      ? isTriggered
                        ? "bell"
                        : "stop-circle"
                      : "play-box"
                  }
                  size={isTriggered? !visible? 80: 64: 70}
                  color={
                    isMonitoring
                      ? !!monitor &&
                        !!monitor.hasTriggered &&
                        monitor.hasTriggered === true
                        ? Colors.constants.danger
                        : Colors.constants.darkGrey
                      : Colors.constants.darkGreen
                  }
                />
              </>
            )}
          </AnimatedCircularProgress>
          {!!monitor &&
            !!monitor.timeRemaining &&
            !(!!monitor.hasTriggered && monitor.hasTriggered === true) && (
              <Text style={[styles.remainingText]}>
                {visible ? `Remaining: ${monitor.timeRemaining}` : " "}
              </Text>
            )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  box: {
    flex: 1,
  },
  body: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  remainingText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 35,
    textAlign: "center",
    fontFamily: "Inter-Black",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 40,
    alignItems: "center",
  },
});
