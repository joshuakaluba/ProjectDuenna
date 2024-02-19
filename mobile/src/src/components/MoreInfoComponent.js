import React, { useState, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import MoreInfoButtonSelection from "./MoreInfoButtonSelection";
import { View, PrimaryButton } from "../components";
import { Colors } from "../constants";
import MonitorsService from "../services/MonitorsService";
import AddMoreMonitorMinutes from "./AddMoreMonitorMinutes";
import { useNavigation } from "@react-navigation/native";
import MonitoringContext from "../hooks/MonitoringContext";
import FullScreenLoadingComponent from "./FullScreenLoadingComponent";

export default function MoreInfoComponent() {
  const navigation = useNavigation();
  const [isAddMoreMonitorMinutesVisible, setIsAddMoreMonitorMinutesVisible] =
    useState(false);
  const { setIsMonitoring, monitor, setMonitor } =
    useContext(MonitoringContext);

  const [minutes, setMinutes] = useState("60");
  const [loading, setLoading] = useState(false);

  const _updateMonitorAsync = async () => {
    setIsAddMoreMonitorMinutesVisible(false);
    setLoading(true);
    try {
      const updatedMonitor = await MonitorsService.updateMonitor({
        ...monitor,
        minutesToAdd: parseInt(minutes),
      });
      setMonitor(updatedMonitor);
    } catch (error) {
      Lib.showError(error);
    }
    setLoading(false);
  };

  const _onCancelMonitorPressAsync = async () => {
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
            try {
              await MonitorsService.updateMonitor({
                ...monitor,
                active: false,
              });
              setIsMonitoring(false);
              setMonitor({});
            } catch (error) {
              console.error(
                "MoreInfoComponent._onCancelMonitorPressAsync",
                error
              );
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <FullScreenLoadingComponent />;
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.box, styles.body]}>
        <MoreInfoButtonSelection
          buttonTitle={"Add More Time"}
          onPress={() => {
            setIsAddMoreMonitorMinutesVisible(true);
          }}
          labelText={"Update your monitor with more time as needed"}
          icon={{ name: "clock", color: "white" }}
          subLabelText={
            "Your contacts are only notified if your monitor is triggered before you cancel it"
          }
        />
        <MoreInfoButtonSelection
          buttonTitle={"Add Notes"}
          onPress={() => {
            navigation.navigate("AddNoteScreen");
          }}
          icon={{ name: "sticky-note", color: "white" }}
          labelText={
            "Add any relevant information you would want your contacts to know"
          }
          subLabelText={"Any text information can be a note"}
        />
      </View>
      <View style={[styles.box, styles.footer]}>
        <PrimaryButton
          title="Stop Monitoring"
          colorOverride={Colors.constants.danger}
          icon={{ name: "stop-circle", color: "white" }}
          onPress={_onCancelMonitorPressAsync}
        />
      </View>
      <AddMoreMonitorMinutes
        visible={isAddMoreMonitorMinutesVisible}
        minutes={minutes}
        setMinutes={setMinutes}
        onUpdateMonitor={_updateMonitorAsync}
        onBackdropPress={() => {
          setIsAddMoreMonitorMinutesVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: "column",
  },
  box: {
    flex: 1,
  },
  body: {
    flex: 6,
  },
  footer: {
    flex: 1,
  },
  positionText: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 9,
    marginBottom: 5,
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nextButtonRow: {
    marginTop: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
